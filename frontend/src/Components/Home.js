import React from 'react';
import NavBar from './NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './Footer';
import Feature from './Feature';
import Slides from './Slides';
import VisionMission from './VisionMission';

const CarouselContainer = () => {
  return (
    <>
    <NavBar />
    <Slides />
    <Feature />
    <VisionMission />
    <Footer />
    </>
  );
}

export default CarouselContainer;
