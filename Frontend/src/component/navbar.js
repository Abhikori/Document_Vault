import React,{useContext, useState, useEffect } from 'react'
import "./bootstrap.min.css";
import "./style.css";
import ProjectContext from '../context/Contexts';

import logo from "../images/NITT_logo.png";
import { Link,useNavigate } from 'react-router-dom';
export default function Navbar() {
    const navigate= useNavigate();
    const context= useContext(ProjectContext);  
    var token =  localStorage.getItem('token');
    const { showAlert,username,setusername}=context; 
    
    
    // const [userToken, setUserToken] = useState(null);
    

const logout=()=>{ 
    if(username==='admin@gmail.com'){
        localStorage.removeItem('token');
        localStorage.removeItem('username');
    }
  navigate('/')
};

useEffect(() => {
    // Check if there's a username in localStorage on component mount
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setusername(storedUsername)
    }
  }, []);

  return (
    <div>
       
        <nav className="navbar navbar-expand-lg bg-white navbar-light shadow-sm px-5 py-3 py-lg-0">
        <Link to="/" className="navbar-brand p-2">
            <h3 className="m-0 text-primary">
                <img src={logo} width="90px" alt="NITT"/>&ensp;
                NIT-TRICHY
            </h3>
        </Link>
        <div className="collapse navbar-collapse" id="navbarCollapse">
            <div className="navbar-nav ms-auto py-0">
                <Link to="/" className="nav-item nav-link active">Home</Link>
                <Link to="/About" className="nav-item nav-link">About</Link>
                {/* <Link to="#" className="nav-item nav-link">Feedback</Link> */}
                {/* <Link to="/cam" className="nav-item nav-link">open camera</Link> */}
            </div>

           {/* <Link to="/login" className="btn btn-primary py-2 px-4 ms-3">Login/Registed</Link> */}
          {username=== "" &&  <Link to="/login" className="btn btn-primary py-2 px-4 ms-3">Login/Registed</Link>} 
          {username === 'admin@gmail.com' ? null : (
             <Link to="/cam" className="nav-item nav-link">
               Open Camera
             </Link>
           )}
          {username!== "" &&  <Link to="#" className="btn btn-primary py-2 px-4 ms-3">{username}</Link> 
           } 
          {username!== "" && <Link to="/login" className="nav-item nav-link" onClick={logout}>Logout</Link>
           } 
           
        </div>
    </nav>
    </div>
  );
}





