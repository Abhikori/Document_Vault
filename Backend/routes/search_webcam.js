const express = require('express');
const router = express.Router();
const { Canvas, Image, ImageData } = require('canvas');
const faceapi = require('face-api.js');
const fs = require('fs/promises');
const path = require('path');
const multer = require('multer');

faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

const MODEL_PATH = 'C:/Users/DELL/Desktop/Summer_Intern_project/Summer_Intern_project/Backend/routes/models';
console.log(MODEL_PATH);

Promise.all([
  faceapi.nets.tinyFaceDetector.loadFromDisk(MODEL_PATH),
  faceapi.nets.faceLandmark68Net.loadFromDisk(MODEL_PATH),
  faceapi.nets.faceRecognitionNet.loadFromDisk(MODEL_PATH),
]).then(() => {
  console.log('Face-api.js models loaded successfully');
}).catch((error) => {
  console.error('Error loading face-api.js models:', error);
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // Specify the directory to save uploaded files
    // const uploadPath = './upload_image';
    // callback(null, uploadPath);
  },
});

async function loadImagesFromDirectory(directoryPath) {
  try {
    const files = await fs.readdir(directoryPath);
    const imagePaths = files
      .filter(file => file.endsWith('.jpg') || file.endsWith('.jpeg'))
      .map(file => path.join(directoryPath, file));

    const base64Images = await Promise.all(
      imagePaths.map(async imagePath => {
        const buffer = await fs.readFile(imagePath);
        const base64String = buffer.toString('base64');
        return base64String;
      })
    );

    return base64Images;
  } catch (error) {
    console.error('Error loading images from directory:', error);
    throw error;
  }
}

const upload = multer({ storage });

router.post('/search', upload.single('file'), async (req, res) => {
  try {
    if (!req.body.file) {
      return res.status(400).json({ error: 'No image provided' });
    }

    // Load base64-encoded images from the 'upload' directory
    const imageDirectory = './upload_image';
    const base64Images = await loadImagesFromDirectory(imageDirectory);

    // Convert the uploaded image to a base64-encoded string for comparison
    const uploadedImageBuffer = await fs.readFile(path.join(imageDirectory, 'image.jpeg'));
    const uploadedBase64String = uploadedImageBuffer.toString('base64');

    // Compare the base64-encoded images
    const results = base64Images.map(base64Image => {
      // Compare the base64 strings using a simple threshold
      const distance = computeHammingDistance(uploadedBase64String, base64Image);
      
      return {
        distance,
        match: distance < 0.2, // Use a threshold to determine if it's a match (adjust as needed)
      };
    });

    console.log(results);
    res.status(200).json({ message: 'Image processed successfully', results });
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to compute Hamming distance between two base64-encoded strings
function computeHammingDistance(str1, str2) {
  let distance = 0;

  for (let i = 0; i < str1.length; i++) {
    if (str1[i] !== str2[i]) {
      distance++;
    }
  }

  return distance / str1.length;
}

module.exports = router;
