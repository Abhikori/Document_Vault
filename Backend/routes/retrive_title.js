const express = require('express');
// const fs = require('fs');
const multer = require('multer');
const upload = multer();
const router = express.Router();
const Document= require('../models/pdf_document');

// const { title } = require('process');

router.get("/getback", async (req, res) => {
  const userEmail = req.user.found.email;
  console.log("userEmail");
  // console.log(publicDirectory);
  try {
    // Fetch the array of document titles from MongoDB (assuming it's stored in a collection named 'documents')
    const documents = await Document.find({email:userEmail},'title');
    // Extract titles from the documents and create an array of titles
    const documentTitles = documents[0].title ;
    
    // Send the titles as JSON data
    res.json(documentTitles);
  } catch (error) {
    console.error('Error fetching document titles:', error);
    res.status(500).json({ message: 'An error occurred while fetching document titles.' });
  }
  
    
 })

 module.exports=router;





