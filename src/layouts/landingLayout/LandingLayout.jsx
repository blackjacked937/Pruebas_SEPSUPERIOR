import React from 'react';
import { NavBar } from '../../components/landingPage/navBar/NavBar';
import { Header } from '../../components/landing/header/Header'; import { Footer } from '../../components/landing/footer';


export function LandingLayout(props) {

    const { children } = props;


    return (
        <div>
            <Header />
            <div>
                {children}
            </div>
            <Footer />
            <a href="#" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
                <i className="bi bi-arrow-up-short"></i>
            </a>
        </div>
    )
}
