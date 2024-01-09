const Connet_to_mongoose= require('./connect_to_db');
const express = require('express');
const cors = require('cors');
const bodyParser= require('body-parser');
const port = 5000;
const multer = require('multer');
const Photo= require('./models/photo_upload');
const checkAuthentication = require('./routes/authenticate');
const auth=require("./routes/auth");
const save_document= require('./routes/save_document')
const save_image= require('./routes/save_image')
const save_webcam_image= require('./routes/save_webcam_image')
const search_webcam= require('./routes/search_webcam')
const getback_title= require('./routes/retrive_title')
const User = require('./models/User');

const Document= require('./models/pdf_document');
const upload = multer();
const app= express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());
app.use(bodyParser.json());
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

// app.use(express.json());
// app.use('/api', router);
app.use('/api/auth',auth);
app.get('/',(req,res)=>{
  res.render("./test.html");
});
const path = require('path');

// Define the directory where your PDF files are located
const publicDirectory = path.join(__dirname, './uploads');
// Serve files from the public directory
console.log(publicDirectory)
app.use(express.static(publicDirectory));
app.use('/api/save_document',checkAuthentication,save_document);
app.use('/api/getback_title',checkAuthentication,getback_title);
app.use('/api/save_image',checkAuthentication,save_image);
app.use('/api/save_webcam_image',checkAuthentication,save_webcam_image);
app.use('/api/search_webcam', search_webcam);



app.use('/api/search/searchEmail', checkAuthentication, async (req, res) => {
  try {
    const emailToSearch = req.query.email;
    console.log(emailToSearch)
    // If the emails don't match, search for the email in your database
    const user = await User.findOne({ email: emailToSearch });

    if (user) {
      // Email found in the database
      return res.status(200).json({ message: `"${emailToSearch}"` });
    } else {
      // Email not found
      return res.status(404).json({ message: `Email "${emailToSearch}" not found.` });
    }
  } catch (error) {
    console.error('Error searching for email:', error);
    return res.status(500).json({ message: 'Error searching for email.' });
  }
});


app.get('/api/search_document/search', checkAuthentication, async (req, res) => {
  const userEmail = req.query.email;
  console.log(userEmail)
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
});



app.use("/api/getback_document/getback/:index",checkAuthentication,async (req, res) => {
  const userEmail = req.user.found.email;
  console.log("userEmail");
  const index = parseInt(req.params.index)


  console.log(index);
  if (index >= 0) {
    try {
      // Fetch the document from MongoDB
      const document = await Document.find({email:userEmail}, 'filePath');
      console.log(document[0].filePath);
      if (document && index < document[0].filePath.length) {
        let documentPath = document[0].filePath[index];
        console.log(documentPath);
        
        let fullPath =path.join(__dirname, documentPath);
        console.log(fullPath);
       
        res.download(fullPath);
     
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



app.get("/getimage", async(req,res)=>{


      try {
         const record = await Photo.find({"email" :'req.body.email'});
         console.log(record[0].file.data);

        const binaryData= record[0].file.data.buffer;

const base64String = await btoa(binaryData); 
console.log(base64String);
res.json( base64String);      
        //  res.render("showimages",{images : base64String});
      } catch (error) {
        res.send(error);
      }
  })



  

// save_document();
    
Connet_to_mongoose();
app.listen(port,()=>{
    console.log("Starting..... your server is listening at 5000")
})

  