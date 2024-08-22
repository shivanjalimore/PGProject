import StudentNavBar from "./StudentNavBar"
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Assignment() {
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
  const [searchText, setSearchText] = useState('')
  const [selectedFile, setSelectedFile] = useState();
  const [assignId, setAssignId] = useState('')
  const navigate = useNavigate();
  const handleSearchText = (e) => {
    setSearchText(e.target.value)
    console.log(searchText);
  }

  const handleFile = function (e, id) {
    let file = e.target.files[0];
    setAssignId(id);
    setSelectedFile(e.target.files[0]);
  }

  function handleDownload(file) {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
      responseType: 'blob',
    };

    axios.get(`http://localhost:8080/student/downloadFile/${file}`,
      config)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = link
        link.setAttribute('download', 'assignment.pdf')
        document.body.appendChild(link)
        link.click()
      }
      )
  }

  const submitForm = (e) => {
    const formData = new FormData();
    e.disabled = true;
    formData.append("file", selectedFile);
    formData.append("assignId", assignId);
    formData.append("studentId", sessionStorage.getItem('userId'));
    console.log(sessionStorage.getItem('userId'));

    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        'content-type': 'multipart/form-data',
      },
    };
    axios
      .post(`http://localhost:8080/student/uploadAssignment/${assignId}`, formData, config)
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => alert("File Upload Error"));
    console.log(formData);

  };
  const [data, setData] = useState({ assignments: [], isFetching: false });

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        responseType: 'blob'
      },
    };
    const fetchassignments = async () => {
      try {
        setData((data) => ({ assignments: data.assignments, isFetching: true }));
        const response = await axios.get('http://localhost:8080/student/assignment', config)
        setData({ assignments: response.data, isFetching: false });
        console.log(response);
        return response;
      } catch (e) {
        console.log(e);
        setData((data) => ({ assignments: data.assignments, isFetching: false }));
      }
    };
    fetchassignments();
  }, []);
  return (
    <div>
      <StudentNavBar />
      <div className='cotainer-fluid' style={{ overflow: "auto" }}>
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: 60 }}>
          <div className="col-10 p-5 shadow bg-white rounded">

            <center><span className="fs-2 fw-bolder"><h2>Assignment</h2></span></center>
            <div className='ui search'>
            
            <div className='ui icon input' style={{ marginLeft: "0rem", width: "100%" }} >
  <input 
    type='text' 
    placeholder='Enter faculty or module name search' 
    className='prompt rounded border-dark form-control' 
    name="searchText" 
    onChange={handleSearchText} 
    value={searchText} 
    style={{ height: "3rem", width: "100%" }} 
  />
</div>
              <br></br>
            </div>
            <table className="table table-striped tabel-secondary table-hover table-bordered ">
              <thead className='table-dark'>
                <tr>
                  <th>Id</th>
                  <th>Faculty Name</th>
                  <th>Module Name</th>
                  <th>Description</th>
                  <th>Download</th>
                  <th>Upload</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.assignments.filter((val) => {
                    if (searchText == "") {
                      return val
                    } else if (val.moduleName.toLowerCase().includes(searchText.toLowerCase()) || val.facultyName.toLowerCase().includes(searchText.toLowerCase())) {
                      return val
                    }
                  })
                    .map(({ id, facultyName, moduleName, description, fileName }) =>
                      <tr>
                        <td>{id}</td>
                        <td>{facultyName}</td>
                        <td>{moduleName}</td>
                        <td>{description}</td>
                        <td><button className="btn btn-primary" onClick={() => handleDownload(fileName)}> <i class="bi bi-box-arrow-in-down"></i> Download</button></td>
                        <div className="field">
                          <label>Upload File</label><br></br>
                          <input type="file"
                            name="file" onChange={(e) => handleFile(e, id)}
                          /></div>
                        <button className="btn btn-info" onClick={(e) => submitForm(e)}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-upload" viewBox="0 0 16 16">
  <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
  <path d="M7.646 1.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 2.707V11.5a.5.5 0 0 1-1 0V2.707L5.354 4.854a.5.5 0 1 1-.708-.708l3-3z"/>
</svg> Upload</button>
                      </tr>)}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignment;
