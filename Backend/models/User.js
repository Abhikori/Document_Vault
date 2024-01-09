
const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name:  String, // String is shorthand for {type: String}
  email: { type:String,unique:true},
    password: String,
    token:String, 
    verified:Boolean
});
const User = mongoose.model('user',UserSchema);
  
module.exports= User;