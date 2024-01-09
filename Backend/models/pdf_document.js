const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  email: String,
  title: Array,
  filePath: Array
  
});

const Document = mongoose.model('Document', documentSchema);
module.exports= Document;