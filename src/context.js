import React, { Component } from 'react';
//import items from './data';

import Client from './Contentful';

//reference to documentation Contentful https://contentful.github.io/contentful.js/contentful/7.13.1/ContentfulClientAPI.html#.getEntries

Client.getEntries({
             content_type: "beachResortRoom",
             
        })
        .then((response) => console.log(response.items));

export const RoomContext = React.createContext();

export default class RoomProvider extends Component {
    state = {
        rooms: [],
        sortedRooms: [],
        featuredRooms: [],
        loading: true,
        type: 'all',
        capacity: 1,
        price: 0,
        minPrice: 0,
        maxPrice: 0,
        minSize: 0,
        maxSize: 0,
        breakfast: false,
        pets: false
    };

    //getData from contentful
        getData = async () => {
            try {
                let response = await Client.getEntries({
                    content_type : "beachResortRoom",
                    //order: 'sys.createdAt'
                    order : '-fields.price'
                });

                //same data as below but chage items to response 
                let rooms = this.formatData(response.items);
                let featuredRooms = rooms.filter(room => room.featured === true);
                let maxPrice = Math.max(...rooms.map(item =>item.price));
                let maxSize = Math.max(...rooms.map(item =>item.size));

                this.setState({
                                rooms, 
                                featuredRooms, 
                                sortedRooms: rooms, 
                                loading: false,
                                price: maxPrice,
                                maxPrice,
                                maxSize
                });

            }
            catch (error){
                console.log(error);

            }
        }

    componentDidMount(){
        //for online contentful data we use this.getData
        this.getData();

        //For local data use below code 
        // let rooms = this.formatData(items);
        // //console.log(rooms);
        // let featuredRooms = rooms.filter(room => room.featured === true);
        // let maxPrice = Math.max(...rooms.map(item =>item.price));
        // let maxSize = Math.max(...rooms.map(item =>item.size));

        // this.setState({
        //                 rooms, 
        //                 featuredRooms, 
        //                 sortedRooms: rooms, 
        //                 loading: false,
        //                 price: maxPrice,
        //                 maxPrice,
        //                 maxSize
        // });
    }
    formatData(items){
        let tempItem = items.map((item) => {
            let id = item.sys.id;
            let images = item.fields.images.map((image) =>  image.fields.file.url
               );
            let room = {...item.fields, images,id};
            return room;
        });
        return tempItem;
    }
    getRoom = (slug)=>{
        let tempRooms = [...this.state.rooms];
        const room = tempRooms.find((room)=>room.slug === slug);
        return room;
    }
    handleChange = (event)=>{
        // console.log(event);
       // const type = event.target.type;
       const target = event.target;
       const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = event.target.name;
       
        // value is disable because we are using checkbox as well if not then use below code
       // const value = event.target.value;
        //console.log(`this is type ${type},this is name ${name},this is value ${value}`);

        this.setState({
            [name] : value
        }, this.filterRooms);
    }
    filterRooms = ()=> {
        //console.log('hello');
        let {
            rooms,
            type,
            capacity,
            price,
            minSize,
            maxSize,
            breakfast,
            pets
        } = this.state;

        //selecting all the rooms
        let tempRooms = [...rooms];

        //transform values
        capacity = parseInt(capacity);
        price = parseInt(price);

        //filter by type
        if(type !== 'all'){
            tempRooms = tempRooms.filter(room =>room.type === type);
            //console.log(tempRooms);
        }

        //filter by capacity
        if(capacity !==1){
            tempRooms = tempRooms.filter(room => room.capacity >= capacity);
        }

        //filter by price
            tempRooms = tempRooms.filter(room => room.price <= price);

        //filter by size
            tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize );

        //filter by breakfast
            if(breakfast){
                tempRooms =  tempRooms.filter(room => room.breakfast === true);
            }

        //filter by pets
        if(pets){
            tempRooms =  tempRooms.filter(room => room.pets === true);
        }

        this.setState({
            sortedRooms: tempRooms
        });

    }
    render() {
      
        return (
            <RoomContext.Provider 
            value={{
                ...this.state, 
                getRoom:this.getRoom, 
                handleChange: this.handleChange
            }}>
                {this.props.children}
            </RoomContext.Provider>
                
        )
    }
}



export const RoomConsumer = RoomContext.Consumer;

// Using Higher Order Component HOC 
export function withRoomConsumer(Component){
    return function consumerWrapper(props) {
        return <RoomConsumer>
                    {value => <Component {...props} context={value} />}
                </RoomConsumer>
    }
}

