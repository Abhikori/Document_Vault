import React from 'react'
import "./bootstrap.min.css";
import "./style.css";
import bg from "../images/bg.png";
import "./Upload.css";
import Navbar from './navbar';
import Footer from './Footer';
import {useNavigate} from 'react-router-dom'
import { useState,useEffect } from 'react';

export default function Upload() {
  const navigate= useNavigate();
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Get the JWT token from local storage
    const token = localStorage.getItem('token');

    if (token) {
      // Token is present, store it in the userToken state variable
      setUserToken(token);
    } else {
      // Token is not present, display a message or suggest logging in
      alert('Please log in to upload files.');
      navigate('/login');
      
      // Optionally, you can redirect the user to the login page
      // window.location.href = '/login'; // Replace with your login route
    }
  }, []);

  const [title, setTitle] = useState('');
  const [file, setFile] = useState(null);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    console.log(e.target.value);
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    console.log(e.target.files[0]);

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userToken) {
      alert("Please Login First");
      navigate('/');
      return;
    }
    const headers = {
      Authorization: `Bearer ${userToken}`,
      // Other headers as needed
    };
    if (!title || !file) {
      alert('Please fill in both fields');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      const Url = 'http://localhost:5000/api/save_document/upload'
      const response = await fetch(Url, {
        method: 'POST',
        body: formData,
        headers:headers,
      });

      if (response.ok) {
        alert('File uploaded successfully!');
        setTitle('');
        setFile(null);
        navigate('/')
      } else {
        alert('File upload failed.');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('An error occurred while uploading the file.');
    }
  };
    return (
        <>
    <Navbar /> 
        <div class="container-home">
        <div class="container-home-img">
            <img width="100%" height="100%" src={bg} alt="img" />
        </div>
        <div class="container mb-5 d-flex justify-content-center">
        <div class="card px-1 py-4">
            <form class="card-body" enctype="multipart/form-data" onSubmit={handleSubmit}>
                <h5 class="information my-2 text-align-center">Fill The Details</h5>
                <hr/>
                <div class="row">
                    <div class="col-sm-12">
                        <div class="form-group">
                            <label for="name" className='font-weight-bold mt-1'><h6>File Title</h6></label> 
                            <input class="form-control" placeholder="File Title" type="text" value={title} onChange={handleTitleChange} required/> </div>
                    </div>
                </div>

                <div class="row ">
                    <div class="col-sm-12">
                        <div class="form-group">
                        <label for="name" className='font-weight-bold mt-4'><h6>Upload Your File</h6></label>
                            <div class="input-group"> 
                            <input class="form-control" type="file" accept=".pdf, .ppt, .pptx, .doc, .docx" onChange={handleFileChange} placeholder="Email ID" required/> </div>
                        </div>
                    </div>
                </div>
                <button type="summit" class="btn btn-primary  btn-block confirm-button">Upload</button>
            </form>
        </div>
    </div>
    </div>
    <Footer/>
    </>
    );
}
