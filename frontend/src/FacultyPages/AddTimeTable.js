import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FacultyNavBar from './FacultyNavBar';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddTimeTable() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("userId");
  const url = `http://localhost:8080/faculty/addtimetable/${id}`;

  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

  const current = new Date();
  const vdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

  useEffect(() => {
    if (sessionStorage.getItem("userName") === null) {
      navigate("/");
    }
    if (sessionStorage.getItem("userRole") === "ROLE_ADMIN") {
      navigate("/admin");
    }
    if (sessionStorage.getItem("userRole") === "ROLE_STUDENT") {
      navigate("/student");
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues: {
      date: '',
      startTime: '',
      endTime: '',
      moduleName: '',
      platform: '',
      link: ''
    },
    validationSchema: Yup.object({
      date: Yup.date().required('Date is required').min(new Date(), 'Date cannot be in the past'),
      startTime: Yup.string().required('Start Time is required'),
      endTime: Yup.string().required('End Time is required'),
      moduleName: Yup.string().required('Module Name is required'),
      platform: Yup.string().required('Platform is required'),
      link: Yup.string().required('Link is required'),
    }),
    onSubmit: (values) => {
      axios.post(url, {
        facultyName: sessionStorage.getItem("userName"),
        platform: values.platform,
        date: values.date,
        link: values.link,
        startTime: values.startTime,
        endTime: values.endTime,
        moduleName: values.moduleName
      }, config)
      .then(result => {
        toast.success('Timetable Added Successfully!!!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/faculty");
      })
      .catch(error => {
        toast.error('Something Went Wrong!!!', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
    },
  });

  return (
    <div>
      <FacultyNavBar />
      <ToastContainer />
      <div className='container-fluid'>
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: 20 ,marginBottom:100}}>
          <div className="col-4 p-5 shadow bg-white rounded">
            <span className='fs-3 mb-3 fw-bolder'>
              <center><h2>Add Timetable</h2></center>
            </span>
            <br></br>
            <form onSubmit={formik.handleSubmit}>
              <div className='mb-3'>
                <label>Date</label>
                <input 
                  type='date' 
                  className='form-control' 
                  id='date'
                  min={vdate}
                  {...formik.getFieldProps('date')}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-danger">{formik.errors.date}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label>Start Time: </label>
                <input 
                  type='time' 
                  className='col-12' 
                  id='startTime'
                  {...formik.getFieldProps('startTime')}
                />
                {formik.touched.startTime && formik.errors.startTime ? (
                  <div className="text-danger">{formik.errors.startTime}</div>
                ) : null}
                &nbsp; &nbsp; &nbsp;
                <label>End Time:</label>
                <input 
                  type='time' 
                  className='col-12' 
                  id='endTime'
                  {...formik.getFieldProps('endTime')}
                />
                {formik.touched.endTime && formik.errors.endTime ? (
                  <div className="text-danger">{formik.errors.endTime}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label>Module Name</label>
                <input 
                  type='text' 
                  className='form-control' 
                  id='moduleName'
                  {...formik.getFieldProps('moduleName')}
                />
                {formik.touched.moduleName && formik.errors.moduleName ? (
                  <div className="text-danger">{formik.errors.moduleName}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label>Platform</label>
                <input 
                  type='text' 
                  className='form-control' 
                  id='platform'
                  {...formik.getFieldProps('platform')}
                />
                {formik.touched.platform && formik.errors.platform ? (
                  <div className="text-danger">{formik.errors.platform}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label>Link</label>
                <input 
                  type='text' 
                  className='form-control' 
                  id='link'
                  {...formik.getFieldProps('link')}
                />
                {formik.touched.link && formik.errors.link ? (
                  <div className="text-danger">{formik.errors.link}</div>
                ) : null}
              </div>
              <br></br>
              <div className='mb-3'>
                <button className='btn btn-primary form-control' type='submit'>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTimeTable;
