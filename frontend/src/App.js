
import './App.css';
import {Routes,Route} from 'react-router-dom'
import 'react-bootstrap/dist/react-bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Home'
import About from './Components/About'
import Contact from './Components/Contact'
import Signin from './Components/Signin'



import Admin from './AdminPages/Admin'
import AddStudent from './AdminPages/AddStudent';
import AddFaculty from './AdminPages/AddFaculty'
import AdminViewStudent from './AdminPages/AdminViewStudent'
import AdminViewFaculty from './AdminPages/AdminViewFaculty';
import EditStudent from './AdminPages/EditStudent';
import EditFaculty from './AdminPages/EditFaculty';


import Faculty from './FacultyPages/Faculty';
import AddTimeTable from './FacultyPages/AddTimeTable';
import ViewTimeTable from './FacultyPages/ViewTimeTable';
import AddNoticeBoard from './FacultyPages/AddNoticeBoard';
import ViewNoticeBoard from './FacultyPages/ViewNoticeBoard';
import EditTimeTable from './FacultyPages/EditTimeTable';
import EditNoticeBoard from './FacultyPages/EditNoticeBoard';
import ViewStudent from './FacultyPages/ViewStudent';
import UploadAssignment from './FacultyPages/UploadAssignment';
import ViewAssignment from './FacultyPages/ViewAssignment';
import EditAssignment from './FacultyPages/EditAssignment';



import ViewAssignmentAnswer from './FacultyPages/ViewAssignmentAnswer';
import Student from './StudentPages/Student';
import Assignment from './StudentPages/Assignment';
import NoticeBoard from './StudentPages/NoticeBoard';
import TimeTable from './StudentPages/TimeTable';
import ViewFaculty from './StudentPages/ViewFaculty';
import Result from './StudentPages/Result';
import Footer from './Components/Footer';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';

import "@fortawesome/fontawesome-free/css/all.min.css";

function App() {
 
  return (
    <div className="App">
     <Routes>
      

     <Route path="/" element={<Home />}></Route>
      <Route path="/about" element={<About />}></Route>
      <Route exact path="/contact" element={<Contact />}></Route>
      <Route exact path="/signin" element={<Signin />}></Route>



      <Route exact path="/admin" element={<Admin/>}></Route>
      <Route exact path="/admin/addstudent" element={<AddStudent/>}></Route>
      <Route exact path="/admin/addfaculty" element={<AddFaculty/>}></Route>
      <Route exact path="/admin/viewstudent" element={<AdminViewStudent/>}></Route>
      <Route exact path="/admin/viewfaculty" element={<AdminViewFaculty/>}></Route>
      <Route exact path="/admin/editstudent/:id" element={<EditStudent/>}></Route>
      <Route exact path="/admin/editfaculty/:id" element={<EditFaculty/>}></Route>



      <Route exact path="/faculty" element={<Faculty/>}></Route>
      <Route exact path="/faculty/addtimetable/" element={<AddTimeTable/>}></Route>
      <Route exact path="/faculty/viewtimetable" element={<ViewTimeTable/>}></Route>
      <Route exact path="/faculty/addnoticeboard/" element={<AddNoticeBoard/>}></Route>
      <Route exact path="/faculty/viewnoticeboard" element={<ViewNoticeBoard/>}></Route>
      <Route exact path="/faculty/edittimetable/:id" element={<EditTimeTable/>}></Route>
      <Route exact path="/faculty/editnoticeboard/:id" element={<EditNoticeBoard/>}></Route>
      <Route exact path="/faculty/viewstudent" element={<ViewStudent/>}></Route>
      <Route exact path="/faculty/addassignment" element={<UploadAssignment/>}></Route>
      <Route exact path="/faculty/viewassignment" element={<ViewAssignment/>}></Route>
      <Route exact path="/faculty/editassignment/:id" element={<EditAssignment/>}></Route>
      <Route exact path="/faculty/viewassignmentanswer" element={<ViewAssignmentAnswer/>}></Route>


      <Route exact path="/student" element={<Student/>}></Route>
      <Route exact path="/student/assignment" element={<Assignment/>}></Route>
      <Route exact path="/student/noticeboard" element={<NoticeBoard/>}></Route>
      <Route exact path="/student/timetable" element={<TimeTable/>}></Route>
      <Route exact path="/student/faculty" element={<ViewFaculty/>}></Route>
      <Route exact path="/student/result" element={<Result/>}></Route>
     </Routes>
     {/* <Footer/> */}
    </div>
  );
}

export default App;
