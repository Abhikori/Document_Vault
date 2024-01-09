
import React, { useState, useEffect } from 'react';
import "./Document.css"
import Navbar from './navbar';
import Footer from './Footer';
const Document = () => {
  const [documentTitles, setDocumentTitles] = useState([]);
  useEffect(() => {
  const fetchDocuments = async () => {
          try {
            const response = await fetch('http://localhost:5000/api/getback_title/getback', {
              method:'GET',
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token
              },
            });
            console.log(response);
            if (!response.ok) {
              console.log(response);
              throw new Error('Failed to fetch documents');
            }
            const data = await response.json();
            setDocumentTitles(data);
          } catch (error) {
            
            console.error('Error fetching documents:', error);
            // Handle error or display an error message to the user
          }
        };
        fetchDocuments();
  }, []);

  return (
    <>
      <Navbar />
      <h2>Document List</h2>
      <div class="uploadcontainer">
        {documentTitles.map((title, index) => (
          <div class="uploadsub-contianer" key={index}>
           
            <button class="uploadbtn" onClick={() => {
              // When the user clicks the "Open" button, open the document with the token in the header
              
              fetch(`http://localhost:5000/api/getback_document/getback/${index}`, {
                method: 'GET',
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`, // Include JWT token in the request header
                },
              })
                .then((response) => {
                  if (response.ok) {
                    // Handle opening the document, e.g., in a new tab or window
                    response.blob().then((blob) => {
                      const url = window.URL.createObjectURL(blob);
                      window.open(url);
                    });
                  } else {
                    throw new Error('Failed to open the document');
                  }
                })
                .catch((error) => {
                  console.error('Error opening the document:', error);
                });
            }}>
              {title}
            </button>
          </div>
        ))}
      </div>
      <Footer/>
    </>
  );
}

export default Document;
