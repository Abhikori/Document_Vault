import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles1.css';
// import Navbar from './navbar';
// import Footer from './Footer';
import ProjectContext from '../context/Contexts';

export default function UploadPhoto() {
  const navigate = useNavigate();
  const [userToken, setUserToken] = useState(null);
  const context = useContext(ProjectContext);
  // const { showAlert, username, setusername } = context;
  const [image, setImage] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      setUserToken(token);
    } else {
      alert('Please log in to upload images.');
      navigate('/login');
    }
  }, []);

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    setImage(selectedFile);
  };

  async function uploadImage() {
    if (!userToken) {
      alert('Please log in to upload images.');
      navigate('/login');
      return;
    }

    if (!image) {
      alert('Please select an image to upload.');
      return;
    }

    const headers = {
      Authorization: `Bearer ${userToken}`,
    };

    const formData = new FormData();
    formData.append('file', image);
    console.log(formData)
    try {
      const url = 'http://localhost:5000/api/save_image/upload';

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: headers,
      });

      if (response.ok) {
        alert('Image uploaded successfully!');
        setImage(null);
        navigate('/');
      } else {
        alert('Image upload failed.');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('An error occurred while uploading the image.');
    }
  }

  return (
    <div className="bodyc">
      <div className="main">
        <h2 className="h2t">Let's upload your image</h2>
        <hr />
        <input
          className="inputc"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <button className="buttonc" onClick={uploadImage}>
          Submit
        </button>
      </div>
    </div>
  );
}
