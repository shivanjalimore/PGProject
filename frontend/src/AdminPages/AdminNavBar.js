import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBContainer, MDBBadge, MDBIcon, MDBBtn } from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AdminNavBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    sessionStorage.clear();

    // Broadcast a message to other tabs/windows
    const logoutChannel = new BroadcastChannel('logout-channel');
    logoutChannel.postMessage({ type: 'logout' });

    // Navigate to the sign-in page
    navigate('/signin');

    // Display a sign-out success message
    alert("Signed Out Successfully !!!");
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
  }

  useEffect(() => {
    // Listen for messages from other tabs/windows
    const logoutChannel = new BroadcastChannel('logout-channel');
    logoutChannel.addEventListener('message', (event) => {
      if (event.data.type === 'logout') {
        navigate('/signin');
      }
    });

    // Cleanup on component unmount
    return () => {
      logoutChannel.close();
    };
  }, [navigate]);

  return (
    <div>
      <MDBNavbar dark bgColor="primary" expand="lg" className="px-5">
        <MDBContainer fluid>
          <MDBNavbarBrand href="#">
            <img src="/image/images_low.png" height="30" alt="E-Vidyalaya" loading="lazy" />
            <span className='fs-4 text-white fw-semibold ms-2' >Online Student Portal</span>
          </MDBNavbarBrand>
          <MDBNavbarNav className='d-flex justify-content-between w-100'>
            <MDBNavbarItem>
              <NavLink to="/admin" className='nav-link fs-4 text-white fw-semibold'>
                <MDBIcon fas icon="home" /> Home
              </NavLink>
            </MDBNavbarItem>
            <MDBNavbarItem className='d-flex align-items-center'>
              <MDBBadge color='light' className='fs-4 text-dark fw-semibold'>
                <MDBIcon fas icon="user-circle" /> {sessionStorage.getItem("userName")}
              </MDBBadge>
              <MDBBtn color='danger' className='ms-3' onClick={handleLogout}>
                <MDBIcon fas icon="sign-out-alt" /> Logout
              </MDBBtn>
            </MDBNavbarItem>
          </MDBNavbarNav>
        </MDBContainer>
      </MDBNavbar>
      <ToastContainer />
    </div>
  );
}

export default AdminNavBar;
