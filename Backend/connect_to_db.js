const mongoose= require('mongoose');
const mangUri = "mongodb://127.0.0.1:27017/summer_intern";

function Connet_to_mongoose(){
      mongoose.connect(mangUri)
       console.log("Connected to Database");
}

module.exports= Connet_to_mongoose;