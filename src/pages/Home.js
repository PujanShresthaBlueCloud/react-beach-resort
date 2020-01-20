import React from 'react';
import Hero from '../components/Hero';
import Banner from '../components/Banner';
import FeatureRooms from '../components/FeatureRooms';

import Services from '../components/Services';
import {Link} from 'react-router-dom';



const Home = () => {
    return (
        <>
            <Hero>
                <Banner title="Luxurious Rooms" subtitle="Delux rooms starting at $299">
                        <Link to='/rooms' className='btn-primary'>
                            Our rooms
                        </Link>
                </Banner>
            </Hero>
            <Services />
            <FeatureRooms />
           
        </>
       
       
    )
}
export default Home;