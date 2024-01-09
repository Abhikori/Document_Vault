import './App.css';
import { BrowserRouter ,Route ,Routes } from "react-router-dom";
import Upload from "./component/Upload";
import Home from './component/Home';
import Project_states from './context/Project_states'
import Login from './component/Login';
import VerifyOtp from './component/VerifyOtp';
import Alert from './component/Alert';
import Upload_photo from './component/Upload_photo';
import Document from './component/Document';
import Cam from './Facerecognition/cam';
import Admindashboard from './Admin/Admindashboard';
import About from './component/About';
import Facecam from './Facerecognition/facecam';
import SearchDocument from './Admin/SearchDocument';
function App() {
  return (
    <>
    <Project_states>
      <BrowserRouter>
      {/* { <Navbar /> } */}
      <Alert/>
          <Routes>
            <Route exact path="/"
              element={<Home/>} />
            <Route exact path="/upload_photo"
              element={<Upload_photo/>} />
            <Route exact path="/cam"
              element={<Cam/>} />
            <Route exact path="/upload"
              element={<Upload/>} />
              <Route exact path="/login"
              element={<Login/>} />
              <Route exact path="/verifyOtp"
              element={<VerifyOtp/>} />
              <Route exact path="/document"
              element={<Document/>}/>
              <Route exact path="/Facecam"
              element={<Facecam/>}/>
              <Route exact path="/About"
              element={<About/>}/>
              <Route exact path="/Admindashboard"
              element={<Admindashboard/>} />
              <Route exact path="/SearchDocument/*" 
              element={<SearchDocument />} />
              
          </Routes>
          {/* <Footer /> */}
        </BrowserRouter>

         </Project_states>
    </>
  );
}

export default App;
