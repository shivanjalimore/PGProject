import './Style.css'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import NavBar from './NavBar';
import 'react-toastify/dist/ReactToastify.css';

function Signin() {
       const navigate = useNavigate()
       const [email, setEmail] = useState('')
       const [password, setPassword] = useState('')

       function reset() {
              document.getElementById("email").value = ""
              document.getElementById("pass").value = ""
       }
       const handleEmail = (e) => {
              setEmail(e.target.value)
       }

       const handlePassword = (e) => {
              setPassword(e.target.value)
       }

       const handleApi = async () => {
              if (email === "") {
                     document.getElementById('passErrorMsg').innerHTML = "email should not be blank"
              }
              if (password === "") {
                     document.getElementById('passErrorMsg').innerHTML = "password should not be blank"
              }
              if (email === "" && password === "") {
                     document.getElementById('passErrorMsg').innerHTML = "password and email should not be blank"
              }

              let user1 = await axios.post('http://localhost:8080/',
                     {
                            email: email,
                            password: password
                     })
                     .then(result => {
                            console.log(result.data)

                            return result.data;
                     }).catch(error => {
                            alert('Bad Credential')
                            reset()
                            console.log(error)
                     })
              if(user1!==undefined)
              {
              console.log(user1.authenticatedDetails.principal.id)
              sessionStorage.setItem("userName", user1.authenticatedDetails.principal.name)
              sessionStorage.setItem("userId", user1.authenticatedDetails.principal.id)
              sessionStorage.setItem("userRole", user1.authenticatedDetails.principal.role)
              sessionStorage.setItem("jwtToken", user1.jwt);
              console.log(sessionStorage.getItem("jwtToken"));
              if (user1.authenticatedDetails.principal.role === "ROLE_STUDENT")
                     navigate('/student');
              else if (user1.authenticatedDetails.principal.role === "ROLE_FACULTY")
                     navigate('/faculty');
              if (user1.authenticatedDetails.principal.role === "ROLE_ADMIN")
                     navigate('/admin');
              }
       }


       return (
              <div>
                     <NavBar/>
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
                     <div className="container-fluid" style={{background:"./image/background.jpg"}}>
                            <div className="row justify-content-around align-items-center" style={{ height: "98vh" }}>
                                   <div className="col-4 p-5 shadow">
                                          <h3 className="head">Login</h3>
                                          <div className="ui form">
                                                 <div className="field">
                                                        <label>Email Address</label>
                                                        <div className="mb-3">
                                                               <input type="email" name="email" id="email" className="form-control" placeholder="Enter Email" onChange={handleEmail} value={email}  />
                                                               <div id="emailErrorMsg"></div>
                                                        </div>

                                                 </div>
                                                 <div className="field">
                                                        <label>Password</label>
                                                        <div className="mb-3">
                                                               <input type="password" name="pass" id="pass" className="form-control" placeholder="Enter Password" onChange={handlePassword} value={password}  />
                                                        </div>
                                                        <div id="passErrorMsg"></div>
                                                 </div>


                                                 <div className="mb-3 py-3" style={{ textAlign: "center" }}>
                                                        <button className="btn btn-primary form-control" onClick={handleApi} disabled={!email || !password}>Sign in</button>
                                                 </div>
                                          </div>
                                   </div>

                            </div>
                     </div>
              </div>
       )

}

export default Signin;

