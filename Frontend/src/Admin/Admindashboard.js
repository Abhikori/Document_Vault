import React, { useState, useEffect } from 'react';
import Footer from '../component/Footer';
import Navbar from '../component/navbar';
import '../component/style.css';
import './admin.css';
import { useNavigate } from 'react-router-dom';
import Document from '../component/Document';
import Webcam from 'react-webcam'; // Import Webcam
import facecam from '../Facerecognition/facecam';

function Admindashboard() {
  const [email, setEmail] = useState('');
  const [searchResult, setSearchResult] = useState('');
  const [userDocuments, setUserDocuments] = useState([]);
  const [showCamera, setShowCamera] = useState(false);
  const navigate = useNavigate();
  const webcamRef = React.useRef(null);
  
  const handleSearch = async () => {
    try {
      
      const response = await fetch(`http://localhost:5000/api/search/searchEmail?email=${email}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setSearchResult(data.message);
        navigate(`../SearchDocument/${email}`)

      } else {
        setSearchResult('Email not found.');
      }
    } catch (error) {
      console.error('Error searching for email:', error);
      setSearchResult('An error occurred while searching for the email.');
    }
  };

  const handleOpenCamera = () => {
    navigate("../facecam")
    // setShowCamera(true);
  };

  const handleCloseCamera = () => {
    setShowCamera(false);
  };

  return (
    <>
      <Navbar />
      <h2>Admindashboard</h2>
      <div className="uploadcontainer">
        <input
          type="text"
          placeholder="Enter email to search"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button id="search" onClick={handleSearch}>
          Search
        </button>
        {searchResult && <p>{searchResult}</p>}
        
        {/* Button to open the camera */}
        <button id="camerabutton" onClick={handleOpenCamera}>Authenticate User</button>

        {/* {showCamera && (
          <div>
            Camera component
            <Webcam ref={webcamRef} />

            Button to close the camera
            <button onClick={handleCloseCamera}>Close Camera</button>
          </div>
        )} */}
      </div>
      <Footer />
    </>
  );
}

export default Admindashboard;

