import React, { useEffect } from 'react';
import FacultyNavBar from './FacultyNavBar';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddNoticeBoard() {
  const navigate = useNavigate();
  const id = sessionStorage.getItem("userId");
  const url = `http://localhost:8080/faculty/addnoticeboard/${id}`;

  const current = new Date();
  const vdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
    },
  };

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
      moduleName: '',
      date: '',
      description: ''
    },
    validationSchema: Yup.object({
      moduleName: Yup.string()
        .required('Module Name is required'),
      date: Yup.date()
        .required('Date is required')
        .min(new Date(), 'Date cannot be in the past'),
      description: Yup.string().min(50,'Description must be contain 50 alphabets ')
        .required('Description is required'),
    }),
    onSubmit: (values) => {
      axios.post(url, {
        facultyName: sessionStorage.getItem("userName"),
        date: values.date,
        description: values.description,
        moduleName: values.moduleName
      }, config)
        .then(response => {
          toast.success('Noticeboard Added Successfully!!!', {
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
    }
  });

  return (
    <div>
      <FacultyNavBar />
      <ToastContainer />
      <div className='container-fluid'>
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: -25 }}>
          <div className="col-4 p-5 shadow bg-white rounded">
            <span className='fs-3 mb-3 fw-bolder'>
              <center><h2>Add Noticeboard</h2></center>
            </span>
            <br></br>
            <form onSubmit={formik.handleSubmit}>
              <div className='mb-3'>
                <label>Module Name</label>
                <input 
                  type='text' 
                  className='form-control' 
                  placeholder='Enter Module Name' 
                  {...formik.getFieldProps('moduleName')}
                />
                {formik.touched.moduleName && formik.errors.moduleName ? (
                  <div className="text-danger">{formik.errors.moduleName}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label>Date</label>
                <input 
                  type='date' 
                  className='form-control' 
                  placeholder='Enter date' 
                  min={vdate}
                  {...formik.getFieldProps('date')}
                />
                {formik.touched.date && formik.errors.date ? (
                  <div className="text-danger">{formik.errors.date}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label>Description</label><br></br>
                <textarea 
                  className='col-100 form-control' 
                  placeholder='Enter Description'
                  {...formik.getFieldProps('description')}
                ></textarea>
                {formik.touched.description && formik.errors.description ? (
                  <div className="text-danger">{formik.errors.description}</div>
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

export default AddNoticeBoard;
