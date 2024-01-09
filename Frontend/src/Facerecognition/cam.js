import React from 'react'
import "../component/bootstrap.min.css";
import Style from "../component/style.css";
import Navbar from '../component/navbar';
import Footer from '../component/Footer';
import { WebcamCapture } from './webcam';
export default function Cam() { 
  const handleCapture = (imageData) => {
    // Handle the captured image data here, e.g., send it to the server or display it on the page.
    console.log("Captured image data:", imageData);
  };
  return ( 
    <>
    <Navbar />
      <div className="web-container-home" style={Style}>
        <WebcamCapture onCapture={handleCapture} /> {/* Pass a callback function to handle the captured image */}
      </div>
      <Footer />
    </>
  );
}
