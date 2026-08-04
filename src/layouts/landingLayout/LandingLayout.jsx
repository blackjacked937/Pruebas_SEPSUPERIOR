import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header } from '../../components/landing/header/Header';
import { Footer } from '../../components/landing/footer';

export function LandingLayout(props) {
    const { children } = props;
    const location = useLocation();

    return (
        <div
            className="landing-layout"
            style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', overflowX: 'hidden' }}
        >
            <Header />
            <main
                className="landing-content"
                style={{ flex: 1, display: 'flex', flexDirection: 'column', margin: 0, padding: 0 }}
            >
                {children}
            </main>
            <Footer />

            <a href="#top" id="scroll-top" className="scroll-top d-flex align-items-center justify-content-center">
                <i className="bi bi-arrow-up-short"></i>
            </a>
        </div>
    )
}