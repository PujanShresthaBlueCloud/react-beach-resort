import React, { Component } from 'react';
import Title from './Title';
import {FaCocktail, FaHiking, FaShuttleVan, FaBeer} from 'react-icons/fa';

export default class Services extends Component {
    state = {
        services:[
                    {
                        icon: <FaCocktail />,
                        title: 'free cocktails',
                        info: 'lorerm khave lto go to house now blach bahls lsieer lkdkjlkjf'
                    },
                    {
                        icon: <FaHiking />,
                        title: 'endless hiking',
                        info: 'lorerm khave lto go to house now blach bahls lsieer lkdkjlkjf'
                    },
                    {
                        icon: <FaShuttleVan />,
                        title: 'free shuttlevan',
                        info: 'lorerm khave lto go to house now blach bahls lsieer lkdkjlkjf'
                    },
                    {
                        icon: <FaBeer />,
                        title: 'Strongest beer',
                        info: 'lorerm khave lto go to house now blach bahls lsieer lkdkjlkjf'
                    }
    ]};
    render() {

        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {this.state.services.map((item, index) => {
                        return <article key={index} className="service">
                            <span>{item.icon}</span>
                            <h6>{item.title}</h6>
                            <p>{item.info}</p>
                        </article>
                    })}
                </div>
                
            </section>
        )
    }
}
