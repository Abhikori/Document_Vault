import React from 'react'
import "./bootstrap.min.css";
import Style from "./style.css";
import bg from "../images/bg.png";
import Upload from './Upload';
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './Footer';
export default function Home() { 
  const navigate=useNavigate(); 
  return ( 
    <>
    <Navbar /> 
    
      <div class="container-home" style={Style}>
        
        <div class="container-home-img" style={Style}>
            <img width="80%" height="100%" src={bg} alt="img" style={Style}/>
        </div>
        <div class="container-home-txt" style={Style}>
            <h1 style={Style}>Upload Your PDF/PPT Easily and efficiently </h1>
            {/* <p style={Style}>ipsum vitae delectus assumenda error ab aut </p>
            <p style={Style}>Lorem ipsum dolor sit amet consectetur adipisicing.</p> */}
            <br/>
            <div Style="margin-top:50px">
                <button style={Style} class="button-65" onClick={()=>navigate("/Upload")}>Upload Documents</button>
                <button style={Style} class="button-65" onClick={()=>navigate("/Document")}>My Documents</button>
            </div>
        </div>
    </div>
    <Footer/>
    </>
  );
}
