import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import AdminNavBar from './AdminNavBar';
import 'react-toastify/dist/ReactToastify.css';

function AddFaculty() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionStorage.getItem("userName")) {
      navigate("/");
    } else if (sessionStorage.getItem("userRole") === "ROLE_FACULTY") {
      navigate("/faculty");
    } else if (sessionStorage.getItem("userRole") === "ROLE_STUDENT") {
      navigate("/student");
    }
  }, [navigate]);

  const current = new Date();
  const vdate = `${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`;

  const formik = useFormik({
    initialValues: {
      name: '',
      dob: '',
      mobNo: '',
      email: '',
      address: '',
      password: ''
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .matches(/^[a-zA-Z]+$/, 'Name must contain only alphabets').min(3,'Name must 3 alphabets')
        .required('Required'),
      dob: Yup.date()
        .max(vdate, 'Date of Birth cannot be in the future')
        .required('Required'),
      mobNo: Yup.string()
        .matches(/^\d{10}$/, 'Mobile number must be exactly 10 digits')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email address')
        .required('Required'),
      address: Yup.string().min(10,'address must min 10 alphabet')
        .required('Required'),
      password: Yup.string().min(8,'Password atleast 8 digit')
        .required('Required')
    }),
    onSubmit: (values) => {
      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
        },
      };
      axios.post("http://localhost:8080/admin/addfaculty", values, config)
        .then(response => {
          toast.success('Faculty Added Successfully!!!', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/admin');
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
      <AdminNavBar />
      <ToastContainer />
      <div className='container-fluid'>
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: 10 ,marginBottom:50}}>
          <div className="col-4 p-4 shadow bg-white rounded">
            <span className='fs-3 mb-3 fw-bolder' style={{ fontFamily: "unset", color: "black" }}>
              <center><h2>Add Faculty</h2></center>
            </span>
            <form onSubmit={formik.handleSubmit}>
              <div className='mb-3'>
                <label style={{ color: "black" }}>Faculty Name</label>
                <input
                  type='text'
                  className='form-control'
                  {...formik.getFieldProps('name')}
                  placeholder='Enter Faculty Name'
                />
                {formik.touched.name && formik.errors.name ? (
                  <div className="text-danger">{formik.errors.name}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label style={{ color: "black" }}>Date Of Birth</label>
                <input
                  type='date'
                  className='form-control'
                  {...formik.getFieldProps('dob')}
                  max={vdate}
                />
                {formik.touched.dob && formik.errors.dob ? (
                  <div className="text-danger">{formik.errors.dob}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label style={{ color: "black" }}>Mobile</label>
                <input
                  type='text'
                  className='form-control'
                  {...formik.getFieldProps('mobNo')}
                  placeholder='Enter Mobile Number'
                />
                {formik.touched.mobNo && formik.errors.mobNo ? (
                  <div className="text-danger">{formik.errors.mobNo}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label style={{ color: "black" }}>Email</label>
                <input
                  type='email'
                  className='form-control'
                  {...formik.getFieldProps('email')}
                  placeholder='Enter Email Address'
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-danger">{formik.errors.email}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label style={{ color: "black" }}>Address</label>
                <textarea
                  className='form-control'
                  {...formik.getFieldProps('address')}
                  placeholder='Enter Address'
                />
                {formik.touched.address && formik.errors.address ? (
                  <div className="text-danger">{formik.errors.address}</div>
                ) : null}
              </div>
              <div className='mb-3'>
                <label style={{ color: "black" }}>Password</label>
                <input
                  type='password'
                  className='form-control'
                  {...formik.getFieldProps('password')}
                  placeholder='Enter Password'
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-danger">{formik.errors.password}</div>
                ) : null}
              </div>
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

export default AddFaculty;
