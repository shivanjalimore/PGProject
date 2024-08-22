import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import StudentNavBar from './StudentNavBar';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBInput,
  MDBTable,
  MDBTableBody,
  MDBTableHead,
} from 'mdb-react-ui-kit';

function NoticeBoard() {
  const navigate = useNavigate();
  useEffect(() => {
    console.log(sessionStorage.getItem("userName"))
    if (sessionStorage.getItem("userName") === null) {
      navigate("/");
    }
    if (sessionStorage.getItem("userRole") === "ROLE_ADMIN") {
      navigate("/admin")
    }
    if (sessionStorage.getItem("userRole") === "ROLE_FACULTY") {
      navigate("/faculty")
    }
  });
  const [data, setData] = useState({ noticeboards: [], isFetching: false });
  const [searchText, setSearchText] = useState('')

  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
  }
  useEffect(() => {
    const fetchnoticeboards = async () => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      try {
        setData((data) => ({ noticeboards: data.noticeboards, isFetching: true }));
        const response = await axios.get('http://localhost:8080/student/noticeboard', config)
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

  return (
    <div>
      <StudentNavBar />
      <MDBContainer fluid style={{ overflow: "auto" }} className='mt-5 mb-5'>
        <MDBRow className='justify-content-center'>
          <MDBCol md='11'>
            <MDBCard className='shadow'>
              <MDBCardBody>
                <MDBCardTitle className='text-center'>View Noticeboard</MDBCardTitle>
               
                <div className='ui search my-3' >
                <label htmlFor="">Search</label>
                  <MDBInput

                    type='text'
                    placeholder='Enter faculty or module name'
                    value={searchText}
                    onChange={handleSearchText}
                  />
                </div>
                <MDBTable striped bordered hover responsive>
                  <MDBTableHead>
                    <tr>
                      <th><b>Sr.No</b></th>
                      <th><strong>Module Name</strong></th>
                      <th><strong>Faculty Name</strong></th>
                      <th><strong>Publish Date</strong></th>
                      <th><strong>Description</strong></th>
                    </tr>
                  </MDBTableHead>
                  <MDBTableBody>
                    {data.noticeboards.filter((val) => {
                      if (searchText === "") {
                        return val;
                      } else if (
                        val.moduleName.toLowerCase().includes(searchText.toLowerCase()) ||
                        val.facultyName.toLowerCase().includes(searchText.toLowerCase())
                      ) {
                        return val;
                      }
                    }).map(({ description, date, facultyName, moduleName }, index) => (
                      <tr key={index}>
                        <td>{index+1}</td>
                        <td>{moduleName}</td>
                        <td>{facultyName}</td>
                        <td>{date}</td>
                        <td>{description}</td>
                      </tr>
                    ))}
                  </MDBTableBody>
                </MDBTable>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </div>
  );
}
export default NoticeBoard;
