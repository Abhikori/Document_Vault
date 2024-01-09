import React from 'react'
import Webcam from "react-webcam";
import './style.css'

const videoConstraints = {
    width: 400,
    height: 300,
    facingMode: "user"
  };
  
  export const WebcamCapture = () => (
    <Webcam
      audio={false}
      height={500}
      screenshotFormat="image/jpeg"
      width={1000}
      videoConstraints={videoConstraints}
    >
      {({ getScreenshot }) => (
        <button id="webbutton"
          onClick={() => {
            const imageSrc = getScreenshot()
          }}
        >
          Capture photo
        </button>
      )}
    </Webcam>
  );
  