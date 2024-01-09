const mongoose = require('mongoose');

const photoSchema = new mongoose.Schema({
    email: String,
    image:String
  });

  const Photo = mongoose.model('Photo', photoSchema);

module.exports= Photo;