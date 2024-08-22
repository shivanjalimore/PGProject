import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MDBNavbar, MDBContainer, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBBtn, MDBIcon } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function StudentNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();
    
    const logoutChannel = new BroadcastChannel('logout-channel');
    logoutChannel.postMessage({ type: 'logout' });
    
    navigate('/signin');
    
    toast.info('Signed Out Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
    logoutChannel.close();
  };

  const logoutChannel = new BroadcastChannel('logout-channel');
  logoutChannel.addEventListener('message', (event) => {
    if (event.data.type === 'logout') {
      navigate('/signin');
    }
  });

  return (
    <>
      <ToastContainer />
      <MDBNavbar expand='lg' dark bgColor='primary' className='px-5'>
        <MDBContainer fluid>
          <MDBNavbarBrand href="/student">
            <img src="/image/images_low.png" height="30" alt="E-Vidyalaya Logo" loading="lazy" />
            <span className='ms-2 fs-3 text-white fw-semibold'>Online Student Portal</span>
          </MDBNavbarBrand>
          <MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
            <MDBNavbarItem>
            <NavLink to="/student" className='nav-link fs-5 text-white fw-semibold'>
              Dashboard
            </NavLink>
          </MDBNavbarItem>
          </MDBNavbarNav>
          <div className='d-flex align-items-center'>
            <h5 className='text-white me-3'><MDBIcon fas icon="user-circle" /> {sessionStorage.getItem("userName")}</h5>
            <MDBBtn color='danger' onClick={handleLogout}>
              <span className='fs-12'><MDBIcon fas icon="sign-out-alt" /> Logout</span>
            </MDBBtn>
          </div>
        </MDBContainer>
      </MDBNavbar>
    </>
  );
}

export default StudentNavBar;

