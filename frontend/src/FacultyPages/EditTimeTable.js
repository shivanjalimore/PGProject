import React,{useState,useEffect} from "react";
import axios from "axios";

import { useNavigate, useParams } from "react-router-dom";
import FacultyNavBar from "./FacultyNavBar";
import { toast, ToastContainer } from 'react-toastify';
function EditTimeTable()
{
    const[link,setLink]=useState('');
    const[platform,setPlatform]=useState('');
    const[facultyName,setFacultyName]=useState('');
    const[moduleName,setModuleName]=useState('');
    const[startTime,setStartTime]=useState('');
    const[endTime,setEndTime]=useState('');
    const[date,setDate]=useState('');

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
    const navigate=useNavigate();
    const param=useParams();
    const tId=param.id;
    const id=sessionStorage.getItem("userId");
    const editUrl=`http://localhost:8080/faculty/edittimetable/${tId}`;
    const updateUrl=`http://localhost:8080/faculty/edittimetable/${tId}`;
    const current = new Date();
    const vdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
    useEffect(()=>{
    const config={
        headers:{
            Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
    };
    axios.get(editUrl,config).then((result)=>{
        const getData=result.data;
        setDate(getData.data.date)
        setFacultyName(getData.data.facultyName)
        setModuleName(getData.data.moduleName)
        setStartTime(getData.data.startTime)
        setEndTime(getData.data.endTime)
        setLink(getData.data.link)
        setPlatform(getData.data.platform)
    })
   },[]);
   function handleLink(e)
   {
      setLink(e.target.value)
   }
   function handlePlatform(e)
   {
      setPlatform(e.target.value)
   }
   function handleDate(e)
   {
      setDate(e.target.value)
   }
   function handleModuleName(e)
   {
      setModuleName(e.target.value)
   }
   function handleFacultyName(e)
   {
      setFacultyName(e.target.value)
   }
   function handleStartTime(e)
   {
      setStartTime(e.target.value)
   }
   function handleEndTime(e)
   {
      setEndTime(e.target.value)
   }
   function submit(e)
   {
    e.preventDefault();
    const config={
      headers:{
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
      },
  };
       axios.put(updateUrl,{
        date:date,
        link:link,
        platform:platform,
        facultyName:facultyName,
        moduleName:moduleName,
        startTime:startTime,
        endTime:endTime
       }
       ,config
       ).then((result)=>{
        alert(" record updated  Succesfully");
        toast.success('Timetable Updated Succesfully !!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
       })
   }).catch((error)=>{
    toast.error(' Something Went Wrong !!!', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    //            alert("Error!!!");
   })
   navigate("/faculty")
  }
   return(
    
    <div>
      <FacultyNavBar />
      <ToastContainer />
      <div className='cotainer-fluid'>
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: 0 }}>
          <div className="col-4 p-5 shadow bg-white rounded">
            <span className='fs-3 mb-3'><center><h2>Edit TimeTable</h2></center></span>
            <form onSubmit={submit}>
              <div className='mb-3'>
                <label>Date</label>
                <input type='date' className='form-control' placeholder='Enter date' onChange={(e) => handleDate(e)} id='date' value={date} min={vdate}></input>
              </div>
              <div className='mb-3'>
                <label>Start Time: </label>
                <input type='time' className='col-3' onChange={(e) => handleStartTime(e)} id='startTime' value={startTime}></input>
                &nbsp;   &nbsp;   &nbsp;
                <label>End Time:</label>
                <input type='time' className='col-3' onChange={(e) => handleEndTime(e)} id='endTime' value={endTime}></input><br></br>

              </div>

              <div className='mb-3'>
                <lable>Module Name</lable>
                <input type='text' className='form-control' onChange={(e) => handleModuleName(e)} id='moduleName' value={moduleName}></input>
              </div>

              <div className='mb-3'>
                <lable>Platform</lable>
                <input type='text' className='form-control' onChange={(e) => handlePlatform(e)} id='platform' value={platform}></input>
              </div>

              <div className='mb-3'>
                <lable>Link</lable>
                <input type='text' className='form-control' onChange={(e) => handleLink(e)} id='link' value={link}></input>
              </div>
              <br></br>
              <div className='mb-3'>
                <button className='btn btn-primary form-control'> Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

  
   )
}

export default EditTimeTable