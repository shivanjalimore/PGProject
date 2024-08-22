import React from 'react';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBCarousel showIndicators showControls fade>
      <MDBCarouselItem itemId={1}>
        <img src='./image/ban1.jpg' className='d-block w-100' alt='...' />
        
      </MDBCarouselItem>

      <MDBCarouselItem itemId={2}>
        <img src='./image/ban2.jpeg' className='d-block w-100' alt='...' />
       
      </MDBCarouselItem>

      <MDBCarouselItem itemId={3}>
        <img src='./image/ban3.jpeg' className='d-block w-100' alt='...' />
        
      </MDBCarouselItem>

      <MDBCarouselItem itemId={4}>
        <img src='./image/ban4.jpeg' className='d-block w-100' alt='...' />
        
      </MDBCarouselItem>

    </MDBCarousel>
  );
}