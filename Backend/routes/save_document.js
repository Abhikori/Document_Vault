const express = require('express');
const fs = require('fs');
const multer = require('multer');
const router = express.Router();
const Document= require('../models/pdf_document')
const User = require('../models/User');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads'); // Specify the directory to save uploaded files
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });
router.post("/upload", upload.single('file'), async(req,res) =>{
  console.log(req)
  try {
    // req.user contains the user's data from the decoded token (assuming your checkAuthentication middleware sets it)
    const userEmail = req.user.found.email;
    console.log(req)
    console.log("waiting ");
    // console.log(userEmail);
    // Find the user in the User collection by email
    const user = await User.findOne({ email: userEmail });
    console.log(req.file);
    console.log(req.body)
    console.log(req.body.title);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Update the filePath array for the user's document or create a new document if it doesn't exist
    let document = await Document.findOne({ email: userEmail });

    if (!document) {
      console.log("search...");
      // If no document exists for the user, create a new one
      const document = new Document({
            email: userEmail,
            title: [req.file.title],
            filePath: [req.file.path],
          }).save();
    }else{

    // Update the filePath array for the document
     console.log(document);
     document.title.push(req.file.originalname)
     document.filePath.push(req.file.path);
    // document.filePath = document.filePath.concat(req.file.path.map((file) => file.path));
    await document.save();
    }
    // Save the document to MongoDB

    res.status(200).json({ message: 'Files uploaded and document updated successfully!' });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ message: 'An error occurred while uploading files and updating the document.' });
  }


 
    
 })

 module.exports=router;





