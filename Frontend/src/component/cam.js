import React from 'react'
import "./bootstrap.min.css";
import Style from "./style.css";
import { useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import Footer from './Footer';
import { WebcamCapture } from './webcam';
export default function Cam() { 
  const navigate=useNavigate(); 
  return ( 
    <>
    <Navbar /> 
    
      <div class="container-home" style={Style}>
        <WebcamCapture />
      </div> 
    <Footer/>
    </>
  );
}
