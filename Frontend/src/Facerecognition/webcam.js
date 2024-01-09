import React, { useEffect, useState, useContext } from 'react';
import Webcam from "react-webcam";
import { useNavigate } from 'react-router-dom';
import ProjectContext from '../context/Contexts';
import '../component/style.css';

const videoConstraints = {
  width: 300,
  height: 200,
  facingMode: "user"
};

export const WebcamCapture = () => {
  const navigate = useNavigate();
  const webcamRef = React.useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const context = useContext(ProjectContext);
  const [userToken, setUserToken] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setUserToken(token);
    } else {
      alert('Please log in to upload images.');
      navigate('/login');
    }
  }, []);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setShowConfirmation(true);
  };

  async function confirmImage() {
    if (capturedImage) {

      const headers = {
        Authorization: `Bearer ${userToken}`,
      };

      if (!userToken) {
        alert('Please log in to upload images.');
        navigate('/login');
        return;
      }
      // Convert the captured image to a Blob and create a FormData object
      const imageBlob = await dataURItoBlob(capturedImage);


      // Create a FormData object and append the binary image
      const formData = new FormData();
      formData.append('file', imageBlob, 'image.jpeg');
      // Send the captured image data to the server
      console.log(formData)
      try {
        const url = 'http://localhost:5000/api/save_webcam_image/upload';
        const response = await fetch(url, {
          method: 'POST',
          body: formData,
          headers: headers,

        })

        if (response.ok) {
          alert('Image uploaded successfully!');
          setCapturedImage(null);
          navigate('/');
        } else {
          alert('Image upload failed.');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('An error occurred while uploading the image.');
      }
      // After confirmation, you can clear the captured image.
      setCapturedImage(null);
      setShowConfirmation(false);
    }
  }
  const retakeImage = () => {
    setCapturedImage(null);
    setShowConfirmation(false);
  };

  // Helper function to convert a data URI to a Blob
  function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }

  return (
    <>
      <div className="web-child-container">
        <Webcam
          audio={false}
          height={300}
          screenshotFormat="image/jpeg"
          width={1000}
          videoConstraints={videoConstraints}
          ref={webcamRef}
        />
        <button id="webbutton" onClick={capture}>
          <p> Capture photo </p>
        </button>
      </div>
      <div>
        {showConfirmation && capturedImage && (
          <div className="capturedimage">
            <h2>Captured Image:</h2>
            <img src={capturedImage} alt="Captured" />
            <div className="confirmation-buttons">
              <button onClick={confirmImage}>Confirm</button>
              <button onClick={retakeImage}>Retake</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
