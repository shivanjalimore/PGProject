import React, { useEffect, useState } from 'react';
import FacultyNavBar from './FacultyNavBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function UploadAssignment() {
  const navigate = useNavigate();

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
      description: '',
      file: null
    },
    validationSchema: Yup.object({
      moduleName: Yup.string()
        .required('Module Name is required'),
      description: Yup.string().min(30,'Description must contain 30 alphabets')
        .required('Description is required'),
      file: Yup.mixed()
        .required('A PDF file is required')
        .test(
          'fileSize',
          'File too large',
          value => !value || (value && value.size <= 1024 * 1024)
        )
        .test(
          'fileType',
          'Unsupported File Format',
          value => !value || (value && ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(value.type))
        )
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("file", values.file);
      formData.append("facultyName", sessionStorage.getItem('userName'));
      formData.append("facultyId", sessionStorage.getItem('userId'));
      formData.append("moduleName", values.moduleName);
      formData.append("description", values.description);

      const config = {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("jwtToken")}`,
          'content-type': 'multipart/form-data',
        },
      };

      axios.post("http://localhost:8080/faculty/addassignment", formData, config)
        .then(response => {
          toast.success('Assignment Uploaded Successfully!!!', {
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

  const handleFileChange = (event) => {
    formik.setFieldValue("file", event.currentTarget.files[0]);
  };

  return (
    <div>
      <FacultyNavBar />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row justify-content-around align-items-center" style={{ height: "98vh", marginTop: -20 }}>
          <div className="col-4 p-5 shadow bg-white rounded">
            <form onSubmit={formik.handleSubmit}>
              <span className="fs-3 fw-bolder" style={{ marginTop: -50 }}><center><h3>Upload Assignment</h3></center></span>
              <br />
              <div className="ui form">
                <div className="field">
                  <label>Module Name</label>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      name="moduleName" 
                      className="form-control" 
                      placeholder="Enter Subject" 
                      value={formik.values.moduleName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur} 
                    />
                    {formik.touched.moduleName && formik.errors.moduleName ? (
                      <div className="text-danger">{formik.errors.moduleName}</div>
                    ) : null}
                  </div>
                </div>
                <div className="mb-3">
                  <label>Description</label><br />
                  <textarea 
                    className="col-100 form-control" 
                    name="description" 
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.description && formik.errors.description ? (
                    <div className="text-danger">{formik.errors.description}</div>
                  ) : null}
                </div>
                <div className="field">
                  <label>Upload File</label>
                  <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.file && formik.errors.file ? (
                    <div className="text-danger">{formik.errors.file}</div>
                  ) : null}
                </div>
                <br />
                <div className="mb-3 py-3" style={{ textAlign: "center" }}>
                  <button className="btn btn-primary form-control" type="submit"><i className="bi bi-cloud-arrow-up-fill"></i> Upload</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadAssignment;
