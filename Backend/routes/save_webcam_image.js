const express = require('express');
const multer = require('multer');
const router = express.Router();
const fs = require('fs')
const User = require('../models/User');
const Photo = require('../models/photo_upload'); // Use your Photo schema/model

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    console.log(file)
    try {
      // Get the user's email from the request object
      const userEmail = req.user.found.email;
      // Specify the directory to save uploaded files with the user's email as the folder name
      const uploadPath = `./upload_image/`;
      console.log(uploadPath)
      // Create the folder if it doesn't exist
      // if (!fs.existsSync(uploadPath)) {
      //   fs.mkdirSync(uploadPath, { recursive: true });
      // }

      callback(null, uploadPath);
    } catch (error) {
      console.error('Error creating directory:', error);
      callback(error, null);
    }
  },
  filename: (req, file, callback) => {
    callback(null, req.user.found.email+'_'+file.originalname); // Use the original file name
  },
});

const upload = multer({ storage });

router.post("/upload", upload.single('file'), async (req, res) => {
 
  try {
    // req.user contains the user's data from the decoded token (assuming your checkAuthentication middleware sets it)
    const userEmail = req.user.found.email;
    // Find the user in the User collection by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    
    // Create a new Photo instance with user's email and image data
    
    const newPhoto = new Photo({
      roll_number: userEmail,
      image: userEmail+'_'+req.file.path, // Use req.file.path to store the image path
    }).save();

    // Save the photo to MongoDB

    res.status(200).json({ message: 'Image uploaded and saved successfully!' });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).json({ message: 'An error occurred while uploading the image.' });
  }
});

module.exports = router;
