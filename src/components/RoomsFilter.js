import React from 'react';
import {useContext} from 'react';
import {RoomContext} from '../context';
import Title from '../components/Title';

//get all unique values
const getUnique = (items, value) => {
    return [...new Set(items.map(item => item[value]))];
}

export default function RoomsFilter({rooms}) {
    const context = useContext(RoomContext);
    //console.log(context);
    const {
        handleChange, 
        type, 
        capacity, 
        price, 
        minPrice, 
        maxPrice, 
        minSize,
        maxSize,
        breakfast, 
        pets
    } = context;

    //get unique type
    let types = getUnique(rooms, 'type');
    

    //add 'all' option for selected value in option
    types = ['all',...types];

    //map to JSX
    types = types.map((item, index) =>{
        return <option value={item} key={index}>{item}</option>;
    })

    //get unique capacity for people 
    let people = getUnique(rooms, 'capacity')

    //to jsx
    people = people.map((item, index) => {
        return <option value={item} key={index}>{item}</option>;
    });

    return (
        <section className="filter-container">
            <Title title="search rooms" />
            <form className="filter-form">
                {/* select type*/}
                    <div className="form-group">
                        <lable htmlFor="type">room type </lable>
                        <select 
                                name="type" 
                                id="type" 
                                value={type} 
                                className="form-control" 
                                onChange={handleChange}>
                            {types}
                        </select>
                    </div>
                {/* end select type*/}
                {/* select Guest capacity */}
                <div className="form-group">
                        <lable htmlFor="capacity">Guest</lable>
                        <select 
                                name="capacity" 
                                id="capacity" 
                                value={capacity} 
                                className="form-control" 
                                onChange={handleChange}>
                            {people}
                        </select>
                    </div>
                {/* end select Guest capacity*/}
                {/* room price */}
                <div className="form-group">
                    <label htmlFor = "price">
                        room price ${price}
                    </label>
                    <input 
                            type="range" 
                            name="price" 
                            max={maxPrice} 
                            min={minPrice} 
                            value={price} 
                            onChange={handleChange} className="form-controll"
                    />
                </div>
                {/* end of room price */}
                {/* size */}
                    <div className="form-group">
                        <lable htmlFor="size">
                            room size
                        </lable>
                        <div className="size-inputs">
                            <input 
                                type="number" 
                                name="minSize" 
                                id="size" 
                                value={minSize} 
                                onChange={handleChange} className="size-input"
                            />
                        </div>
                        <div className="size-inputs">
                            <input 
                                type="number" 
                                name="maxSize" 
                                id="size" 
                                value={maxSize} 
                                onChange={handleChange} className="size-input"
                            />
                        </div>
                    </div>
                {/* end of size */}
                {/* etras */}
                    <div className="form-group">
                        <div className="single-extra">
                            <input 
                                type= "checkbox" 
                                name="breakfast"  
                                id="breakfast" 
                                checked={breakfast} 
                                onChange={handleChange}
                            />
                            <lable htmlFor="breakfast">breakfast</lable>
                        </div>

                    </div>
                    <div className="form-group">
                        <div className="single-extra">
                            <input 
                                    type= "checkbox" 
                                    name="pets"  
                                    id="pets" 
                                    checked={pets} 
                                    onChange={handleChange}
                            />
                            <lable htmlFor="pets">pets</lable>
                        </div>

                    </div>
                {/* end of extras */}

            </form>
        </section>
    )
}
