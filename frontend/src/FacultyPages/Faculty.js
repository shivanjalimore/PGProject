
import React, { useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacultyNavBar from './FacultyNavBar';
function Faculty() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("userName") === null) {
      navigate("/");
    }
    if (sessionStorage.getItem("userRole") === "ROLE_ADMIN") {
      navigate("/admin")
    }
    if (sessionStorage.getItem("userRole") === "ROLE_STUDENT") {
      navigate("/student")
    }
  });

  return (
    <div>
      <FacultyNavBar/>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className='cotainer-fluid'>
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: 20,marginBottom: 280 }}>

          <div className="col-10 p-5 shadow bg-white rounded" >
            <center><span className='fw-bolder fs-1'><h3> <i class="bi bi-person-square"></i> &nbsp;Faculty Dashboard</h3></span></center>
            <br></br>
            <table style={{ marginLeft: 40, marginTop: 20 }}>
              <tr>
                <td className='px-3 ' >
                  <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                  
                    <div className="card-body">
                      <NavLink to="/faculty/addtimetable/" style={{ textDecoration: 'none' }}> <h5 className="card-title p-4 text-white">Add TimeTable</h5></NavLink>
                    </div>
                  </div>
                </td>

                <td className='px-3' >
                  <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                  
                    <div className="card-body">
                      <NavLink to="/faculty/viewtimetable" style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">View TimeTable</h5> </NavLink>
                    </div>
                  </div>
                </td>
                <td className='px-3 ' >
                  <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                 
                    <div className="card-body">
                      <NavLink to="/faculty/addnoticeboard" style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">Add Notice Board</h5> </NavLink>
                    </div>
                  </div>
                </td>
                <td className=' px-3 ' >
                  <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                 
                    <div className="card-body">
                      <NavLink to="/faculty/viewnoticeboard" style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">View Notice Board</h5> </NavLink>
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <td className='px-3'>
                  <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                  
                    <div className="card-body">
                      <NavLink to="/faculty/viewstudent" style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">View &nbsp;Student</h5> </NavLink>
                    </div>
                  </div>
                </td>

                <td className=' px-3 ' >
                  <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                  
                    <div className="card-body">
                      <NavLink to="/faculty/addassignment" style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">Upload Assign- ment</h5> </NavLink>
                    </div>
                  </div>
                </td>

                <td className=' px-3 ' >
                  <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                  
                    <div className="card-body">
                      <NavLink to="/faculty/viewassignment" style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white">View Assign- ment</h5> </NavLink>
                    </div>
                  </div>
                </td>

                <td className=' px-3 '>
                  <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                  
                    <div className="card-body">
                      <NavLink to="/faculty/viewassignmentanswer" style={{ textDecoration: 'none' }}><h5 className="card-title p-4 text-white"> View Assign- ment Answer</h5> </NavLink>
                    </div>
                  </div>
                </td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}


export default Faculty;