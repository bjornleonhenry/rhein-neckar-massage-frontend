import React from 'react';
import Hero from '../components/Hero';
import Services from '../components/Services';
import About from '../components/About';
import GirlsProfiles from '../components/GirlsProfiles';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import AmbientePreview from '../components/AmbientePreview';

const Home = () => {
  return (
    <>
      <Hero />
  <GirlsProfiles hideActions={true} />
      <About />
      <Services />
      <AmbientePreview />
      <Testimonials />
      <Contact />
    </>
  );
};

export default Home;
