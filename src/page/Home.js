import React from 'react';
import Hero from '../components/Hero';
import Carousel from '../components/Carousel';
import CardNumber from '../components/CardNumber';
import '../styles/home.css';
import IconsText from '../components/IconsText';

const Accueil = () => {
  return (
    <div className="cards-group">
      <div id="home-carousel" className='home-card'>
        <Carousel />
      </div>
      <div id='hero' className='home-card'>
        <Hero />
      </div>
      <div id='illustration' className="home-card">
      </div>
      <div id="card-number" className='home-card'>
        <CardNumber />
      </div>
      <div id='IconsText' className='home-card'>
        <IconsText />
      </div>
    </div>
  );
};

export default Accueil;