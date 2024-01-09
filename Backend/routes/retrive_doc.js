const express = require('express');
const multer = require('multer');
const router = express.Router();
const Document= require('../models/pdf_document');

router.get("/getback/:index", async (req, res) => {
  const userEmail = req.user.found.email;
  console.log("userEmail");
  const index = parseInt(req.params.index);



  console.log(index);
  if (index >= 0) {
    try {
      // Fetch the document from MongoDB
      const document = await Document.find({email:userEmail}, 'filePath');
      console.log(document[0].filePath);
      if (document && index < document[0].filePath.length) {
        let documentPath = document[0].filePath[index];
        console.log(documentPath);
        let path1 = "";
        let fullPath = path1+documentPath;// path.join(__dirname, documentPath);
        console.log(fullPath);
        // Serve the document using Express's `res.sendFile` method
        res.status(200).json({ filePath: fullPath });
        // res.sendFile(fullPath, { root: path1 }, (err) => {
        //   if (err) {
        //     console.error('Error serving document:', err);
        //     res.status(500).send('Error serving document');
        //   }
        // });
      } else {
        res.status(404).send('Document not found');
      }
    } catch (error) {
      console.error('Error fetching document:', error);
      res.status(500).send('Error fetching document');
    }
  } else {
    res.status(400).send('Invalid index');
  }
 });

 module.exports=router;