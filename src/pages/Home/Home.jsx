import React from 'react';
import Hero from '../../components/Hero';
import HowItWorks from '../HowItWorks';
import Testimonials from '../Testimonials';
import CTASection from '../CTASection';
import About from '../About';
import Packages from '../Packsges';
import Features from '../Features';
import FAQ from './FAQ';

const Home = () => {
    return (
        <div>
            <Hero />
            <About />
            <Packages />
            <Features />
            <Testimonials />
            <HowItWorks />
            <FAQ />
            <CTASection />
        </div>
    );
};

export default Home;