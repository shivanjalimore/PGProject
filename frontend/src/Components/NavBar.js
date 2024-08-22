
import React from 'react';
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBNavbarToggler, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBIcon } from 'mdb-react-ui-kit';
import { NavLink } from 'react-router-dom';
// import './Style.css';

function NavBar() {
  return (
    <MDBNavbar expand='lg' light bgColor='primary' className='px-3'>
      <MDBContainer fluid>
        <MDBNavbarBrand href='#'>
          <img src='./image/images_low.png' height='40' alt='img' loading='lazy' />
          <span className='fs-4 text-white fw-semibold' >CDAC EduTrack</span>
        </MDBNavbarBrand>
        <MDBNavbarToggler aria-controls='navbarExample01' aria-expanded='false' aria-label='Toggle navigation'>
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>
        <div className='collapse navbar-collapse' id='navbarExample01'>
          <MDBNavbarNav right className='mb-2 mb-lg-0'>
            <MDBNavbarItem>
              <MDBNavbarLink>
                <NavLink className='nav-link fs-4 text-white fw-semibold' to='/'>Home</NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink>
                <NavLink className='nav-link fs-4 text-white fw-semibold' to='/about'>About</NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink>
                <NavLink className='nav-link fs-4 text-white fw-semibold' to='/contact'>Contact</NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink>
                <NavLink className='nav-link fs-4 text-white fw-semibold' to='/signin'>Log in</NavLink>
              </MDBNavbarLink>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </div>
      </MDBContainer>
    </MDBNavbar>
  );
}

export default NavBar;
