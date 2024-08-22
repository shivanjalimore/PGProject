
import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import StudentNavBar from './StudentNavBar';

function Student() {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("userName") === null) {
      navigate("/");
    }
    if (sessionStorage.getItem("userRole") === "ROLE_ADMIN") {
      navigate("/admin")
    }
    if (sessionStorage.getItem("userRole") === "ROLE_FACULTY") {
      navigate("/faculty")
    }
  }, [navigate]);

  return (
    <div>
      <StudentNavBar />
      <div className='container-fluid'>
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: 30,marginBottom:120 }}>
          <div className="col-8 p-5 shadow bg-white rounded">
            <center><span className='fw-bolder fs-2'><h2><i className="bi bi-mortarboard"></i> &nbsp; Student Dashboard</h2></span></center>
            <br />
            <table style={{ marginLeft: 40, marginTop: 20 }}>
              <tbody>
                <tr>
                  <td className='p-1 px-5'>
                    <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                      
                      <div className="card-body">
                        <NavLink to="/student/timetable" style={{ textDecoration: 'none' }}>
                          <h5 className="card-title p-4 text-white">TimeTable</h5>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                      
                      <div className="card-body">
                        <NavLink to="/student/noticeboard" style={{ textDecoration: 'none' }}>
                          <h5 className="card-title p-4 text-white">NoticeBoard</h5>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="card text-bg-success mb-3" style={{ maxWidth: '14rem', marginLeft: '50px' }}>
                      
                      <div className="card-body">
                        <NavLink to="/student/result" style={{ textDecoration: 'none' }}>
                          <h5 className="card-title p-4 text-white">Result</h5>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <td className='p-3 px-5'>
                    <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                     
                      <div className="card-body">
                        <NavLink to="/student/faculty" style={{ textDecoration: 'none' }}>
                          <h5 className="card-title p-4 text-white">Faculty</h5>
                        </NavLink>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="card text-bg-success mb-3" style={{ maxWidth: '18rem' }}>
                     
                      <div className="card-body">
                        <NavLink to="/student/assignment" style={{ textDecoration: 'none' }}>
                          <h5 className="card-title p-4 text-white">Assignment</h5>
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

export default Student;
