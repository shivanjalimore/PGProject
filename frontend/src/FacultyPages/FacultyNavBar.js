import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBBtn,
  MDBIcon
} from 'mdb-react-ui-kit';

function FacultyNavBar() {
  const navigate = useNavigate();
  const [showNav, setShowNav] = React.useState(false);

  const handleLogout = () => {
    // Clear session storage (or perform your logout logic)
    sessionStorage.clear();

    // Broadcast a message to other tabs/windows
    const logoutChannel = new BroadcastChannel('logout-channel');
    logoutChannel.postMessage({ type: 'logout' });

    // Navigate to the sign-in page
    navigate('/signin');

    // Display a sign-out success message
    toast.info('Signed Out Successfully', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // Close the broadcast channel
    logoutChannel.close();
  };

  useEffect(() => {
    const logoutChannel = new BroadcastChannel('logout-channel');
    const handleLogoutMessage = (event) => {
      if (event.data.type === 'logout') {
        // Perform logout logic here (e.g., redirect to the sign-in page)
        navigate('/signin');
      }
    };

    logoutChannel.addEventListener('message', handleLogoutMessage);

    return () => {
      logoutChannel.removeEventListener('message', handleLogoutMessage);
      logoutChannel.close();
    };
  }, [navigate]);

  return (
    <MDBNavbar expand='lg' dark bgColor='primary'>
      <MDBNavbarBrand href='#'>
        <img src="/image/images_low.png" height='30' alt='' />
        <span className='ms-2' >Online Student Portal</span>
      </MDBNavbarBrand>
      <MDBNavbarToggler
        type='button'
        data-target='#navbarNav'
        aria-controls='navbarNav'
        aria-expanded='false'
        aria-label='Toggle navigation'
        onClick={() => setShowNav(!showNav)}
      >
        <MDBIcon icon='bars' fas />
      </MDBNavbarToggler>
      <MDBCollapse navbar show={showNav}>
        <MDBNavbarNav right className='ms-auto'>
          <MDBNavbarItem>
            <NavLink to="/faculty" className='nav-link'>
              Dashboard
            </NavLink>
          </MDBNavbarItem>
          <MDBNavbarItem className='d-flex align-items-center'>
            <span className='navbar-text text-white me-3'>
              <MDBIcon icon='user-circle' className='me-2' />
              {sessionStorage.getItem("userName")}
            </span>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBBtn color='danger' onClick={handleLogout}>
              <MDBIcon icon='sign-out-alt' className='me-2' />
              Logout
            </MDBBtn>
          </MDBNavbarItem>
        </MDBNavbarNav>
      </MDBCollapse>
      <ToastContainer />
    </MDBNavbar>
  );
}

export default FacultyNavBar;
