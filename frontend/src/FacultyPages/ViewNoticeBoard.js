import React from 'react'
//import Faculty from '../StudentPages/ViewFaculty'
import FacultyNavBar from './FacultyNavBar'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function ViewNoticeBoard() {

  useEffect(() => {
    console.log(sessionStorage.getItem("userName"))
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

  const [data, setData] = useState({ noticeboards: [], isFetching: false });
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
  }
  const navigate = useNavigate();
  useEffect(() => {
    const fetchnoticeboards = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      try {
        setData((data) => ({ noticeboards: data.noticeboards, isFetching: true }));
        const response = await axios.get(`http://localhost:8080/faculty/viewnoticeboard/${sessionStorage.getItem("userId")}`, config)
        setData({ noticeboards: response.data, isFetching: false });
        console.log(response);
        return response;
      } catch (e) {
        console.log(e);
        setData((data) => ({ noticeboards: data.noticeboards, isFetching: false }));
      }
    };
    fetchnoticeboards();
  }, []);
  const removeNoticeBoard = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
    };

    axios.delete(`http://localhost:8080/faculty/viewnoticeboard/delete/${id}`, config).then((response) => {

      alert("NoticeBoard record " + id + " deleted!");
      toast.success('NoticeBoard Record Deleted With Id ' + id + ' Succesfully ', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }).catch(error => {
      toast.error(' Something Went Wrong !!!', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      alert("Error!!!");
    })
  }
  return (
    <div> <FacultyNavBar />
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
      <form>
        <div className='cotainer-fluid' style={{ overflow: "auto" }}>
          <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: -20 }}>
            <div className="col-10 p-5 shadow bg-white rounded">
              <center><span className='fs-2 fw-bolder'><h2>View NoticeBoard Details</h2></span></center>
              <div className='ui search'>
                {/* <div className='ui icon input' style={{ marginLeft: "33rem" }} >
                  <input type='text' placeholder='Enter module name' className='prompt col-9 rounded border-dark form-control col-10' name="searchText" onChange={handleSearchText} value={searchText} style={{ height: "3rem" }}></input>
                </div> */}
                <br></br>
              </div>
              <table className="table table-striped table-secondary table-hover">
                <thead className='table-dark'>
                  <tr>
                    <th>Id</th>
                    <th>Module Name</th>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    data.noticeboards.filter((val) => {
                      if (searchText == "") {
                        return val
                      } else if (val.moduleName.toLowerCase().includes(searchText.toLowerCase())) {
                        return val
                      }
                    })
                      .map(({ id, moduleName,date,description }) =>
                        <tr>
                          <td>
                            {id}
                          </td>
                          <td>
                            {moduleName}
                          </td>
                          <td>
                            {date}
                          </td>
                          <td>
                            {description}
                          </td>
                          
                          <td>
                            <button className="button border-white" onClick={() => navigate(`/faculty/editnoticeboard/${id}`)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
</svg></button>
                            {/* <button className="button muted-button" onClick={() => removeFaculty({id})}>Delete</button> */}
                            <button className="button border-white" onClick={() => removeNoticeBoard(id)}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
</svg></button>
                          </td>
                        </tr>
                      )}

                </tbody>
              </table>
            </div>
          </div>

        </div>
      </form>
    </div>

  )
}

export default ViewNoticeBoard