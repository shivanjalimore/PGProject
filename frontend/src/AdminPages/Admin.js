import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AdminNavBar from './AdminNavBar';
import 'react-toastify/dist/ReactToastify.css';

function Admin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("userName") === null) {
      navigate("/");
    }
    if (sessionStorage.getItem("userRole") === "ROLE_FACULTY") {
      navigate("/faculty");
    }
    if (sessionStorage.getItem("userRole") === "ROLE_STUDENT") {
      navigate("/student");
    }
  }, [navigate]);

  return (
    <div>
      <AdminNavBar />
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
      <div className='container-fluid'>
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: 10 ,marginBottom:70}}>
          <div className="col-6 p-5 shadow bg-white rounded">
            <span className='fs-3 mb-3 fw-bolder' style={{ fontFamily: "unset" }}>
              <center><h3><i className="bi bi-person-square"></i> &nbsp;Admin Dashboard</h3></center>
            </span>
            <table style={{ marginLeft: 15, marginTop: 20 }}>
              <tbody>
                <tr>
                  <td className='p-1 px-5'>
                    <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                      <div style={{ backgroundColor: "gray" }}>
                        <NavLink to="/admin/addfaculty" style={{ textDecoration: 'none' }}>
                          <div className="card-body text-center">
                            
                            <h5 className="card-title text-white"><i className="bi bi-person-plus-fill"></i> &nbsp; Add Faculty</h5>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                      <div style={{ backgroundColor: "gray" }}>
                        <NavLink to="/admin/viewfaculty" style={{ textDecoration: 'none' }}>
                          <div className="card-body text-center">
                           
                            <h5 className="card-title text-white"><i className="bi bi-person-plus-fill"></i> &nbsp; View Faculty</h5>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='p-3 px-5'>
                    <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                      <div style={{ backgroundColor: "gray" }}>
                        <NavLink to="/admin/addstudent" style={{ textDecoration: 'none' }}>
                          <div className="card-body text-center">
                            
                            <h5 className="card-title text-white"><i className="bi bi-person-plus-fill"></i> &nbsp; Add Student</h5>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                      <div style={{ backgroundColor: "gray" }}>
                        <NavLink to="/admin/viewstudent" style={{ textDecoration: 'none' }}>
                          <div className="card-body text-center">
                            
                            <h5 className="card-title text-white"><i className="bi bi-person-plus-fill"></i> &nbsp; View Student</h5>
                          </div>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
