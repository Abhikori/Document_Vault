const express = require("express");
const User = require("../models/User");
const UserOtp = require("../models/Userotp");
const router = express.Router();
const nodemailer= require("nodemailer");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jWT_SECRETE_CODE = "fINALLY WE CALL FROM COLLEGE";

let success= false;
let transporter = nodemailer.createTransport({
  service:'gmail',
  auth:{
      user: "abhishekkori7902@gmail.com",
      pass:"bxrpadifcrfnghet",
  },
  tls: {
      rejectUnauthorized: false
  }
});
transporter.verify((error,success)=>{
  if(error){
      console.log(error);
  } else {
      console.log("Ready for Message");
      console.log(success);
  }
})

//////
router.get("/", (req, res) => {
  res.send("In auth token");
});

const validation= [body("email",'please Enter a valid Email').isEmail(), body("name",'Name must be atleat 5 character').isLength({ min: 5 }),body("password",'Password must be atleat 6 character').isLength({ min: 6 })];



router.post( "/signup",
  [validation],
  async (req, res)  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      
 
  let {name ,email , password}= req.body;
  if(!email || !name || !password){
    // throw Error("Empty Details is not allowed");
    let  message = "Empty Details is not allowed";

    res.json({'message':"Empty Details is not allowed"});
}
 console.log(req.body)
//  const user=null;
  User.find({email}).then((result)=>{
    if(result.length){
    
       let message = "User with the provided Email already exists";
       console.log(message)
       res.json({message});
    } else {
        const salt = 10;
        bcrypt.hash(password,salt).then((hashpassword)=>{
         const user = new User({
                 name,
                 email,
                 password : hashpassword,
                 verified :false,
            });
            user.save().then((result)=>{
                sendOtpVerificationEmail({email},res);
                res.json({success:true})
            }).catch((err)=>{
                console.log(err);
            //     res.json({status :"Failed",
            // });
           let message ="An error occured while saving user account";
            res.json({ success:false,  message:message });
            });
        }).catch((err)=>{
            console.log(err);
     
            let message ="An error occured while hashing Password";
            res.json({ success:false , message:message });
        })
    }})
    
  }
    catch (error) {
      console.log("Something went wrong..");
      res.status(500).json({error:"Something went wrong.."})
    }
  }
);
router.post( "/resetpassword",
[body("email",'please Enter a valid Email').isEmail(),body("newpass",'Password must be atleat 6 character').isLength({ min: 6 })],
  async (req, res)  => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      

  let {email , newpass}= req.body;
  if(!email ||  !newpass){
  
    let  message = "Empty Details is not allowed";

    res.json({'message':"Empty Details is not allowed"});
} else{
 console.log(req.body)
//  const user=null;
      const result=   User.find({email});
    if(result.length==0){
    
       let message = "User with the provided Email Not exists";
       console.log(message)
       res.json({message});
    } else {
        const salt = 10;
        bcrypt.hash(newpass,salt).then( async (hashpassword)=>{
          console.log(email);
          const update= await  User.findOneAndUpdate({email :email},{ $set : {"password":hashpassword}},{new: true});
          console.log(update,"update... ");
          const del= await  UserOtp.deleteMany({userId:email});
          
       res.json({ success:true});
        }).catch((err)=>{
            console.log(err);
     
            let message ="An error occured while hashing Password";
            res.json({ success:false , message:message });
        })
    }}
   
  
}
    catch (error) {
      console.log("Something went wrong..");
      res.status(500).json({error:"Something went wrong.."})
    }
  }
);
const sendOtpVerificationEmail= async({email},res)=>{

  try {
   const otp= `${ Math.floor ( 1000 + Math.random() * 9000) }`;
   const mailoption ={
      from : "abhishekkori7902@gmail.com",
      to :email,
      subject : "Verify Your Email",
      html : `<p> Enter ${otp} in the app to verify your email address and complete the signUp process <br> The code expires in 10 minutes </p>`
   };

   const salt = 10;
   const hashOtp= await bcrypt.hash(otp,salt);
   console.log("This Is my hashed Otp",hashOtp);
  const newUserOtp = new UserOtp({
      userId:email,
      otp: hashOtp ,
      createAt: Date.now(),
      expireAt: Date.now() + 600000,
   })

   await newUserOtp.save();
    transporter.sendMail(mailoption);

  let message= ""
  let useremail=email
  // res.render('verifyotp', {  message,useremail: useremail });
  } catch (err){
      console.log(err);

  }
}
router.post("/login",
  [body("email",'please Enter a valid Email').isEmail(),body("password",'Password must be atleat 6 character').isLength({ min: 6 })],
  async (req, res)  => {

    const {email,password}=req.body;
    console.log(req.body)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
              var mes= errors.array()[0];
      return res.status(400).json( {message:mes.msg} );
    }
    try {
      
   let found = await User.findOne({email:email});
   if(!found)
   {
    return res.status(400).json({message:"Please SignUp First "});
   }
   console.log(found.password)
    const match=await bcrypt.compare(password,found.password);
      // const data =user.id;
      console.log(match)
      if(!match)
      {
        return res.status(400).json({message:"Invalid Credentials"});
      }
      const data ={
        found:{
              email:found.email
            }
          }
      console.log(data);
      const jwqt = jwt.sign(data,jWT_SECRETE_CODE);
      console.log({'authtoken':jwqt})
      // .then(user => res.json(user)).catch(err=>{res.json({error:"This Email is already taken"})}) ;
    success=true;
    console.log(req.body);
    res.send({'authtoken':jwqt,success});}
    catch (error) {
      // console.log(error);
     return res.status(500).json({message:error})
    }
  }
);
router.post("/verifyOtp",async (req,res)=>{
  try {
      console.log(req.body);
      let {email,otp} = req.body;
      if(!email || !otp){
          // throw Error("Empty Details is not allowed");
          let  message = "Empty Details is not allowed";
          let useremail=email;
          // res.render('verifyotp', {  message,useremail });
      }else{
        const record=  await UserOtp.find({
              userId:email,

          });
          if( record.length <= 0){
         
              // throw new Error(" Accound record is Invalid or has been verified already");
              let  message = " Accound record is Invalid or has been verified already";
              let useremail=email
              res.json({ success: false,  message,useremail: useremail});
          }else {
              // cons
              const { expireAt }= record[0];
              const hashOtp= record[0].otp;
              if(expireAt< Date.now()){
                  await UserOtp.deleteMany({userId:email});
                  // throw new Error("Code Has Expired, Please Request again");
                  let  message = "Code Has Expired, Please Request again";
                  let useremail=email
                  res.json({ success:false, message });
                  
              } else{
                   const validotp = await  bcrypt.compare(otp,hashOtp);
                   console.log(validotp);
                   if(!validotp){
                      // throw new Error("Invalid Otp");
                      console.log("Invalid Otp");
                      let  message = "Invalid Otp";
                      let useremail=email
                      res.json({  success:false, message,useremail: useremail });
                   } else{
                      console.log(email);
                     const update=  await User.findOneAndUpdate({email :email},{ $set : {verified:true}},{new: true});
                     console.log(update,"update.. ");
                     const del=  await UserOtp.deleteMany({userId:email});
                     console.log(del);
                  //    let  message = "Your account is verified successfully";
                  //    let useremail=email
                  res.json({ success:true});
                  // res.render('verified');
                   }
                 
                  
              }
          }
      }
  } catch (error) {
      console.log(error);

      // res.json({
      //     status :"Failed",
      //     message:error.message
      //  })
      let  message = error.message;

      res.render('verifyotp', {  message });

  }
})
router.post("/resendOtpVerificationcode", [body("email",'please Enter a valid Email').isEmail()],
async (req, res)  => {

  

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
            var mes= errors.array()[0];
    return res.status(400).json( {message:mes.msg} );
  }
  try {
      let {email}  = req.body;

      if(!email){
        //  throw Error("Empty User details are not allowed");
         return res.status(400).json({message:"Empty User details are not allowed"});

      } else {
         await UserOtp.deleteMany({ userId : email});
         sendOtpVerificationEmail({email},res);
         res.json({success:true})
      }
  } catch (error) {
      console.log(error);
      // res.json({
      //     message : error.message,
      // })
      const message="Error while sending the otp! Please try again";
// const useremail=""
  res.json( {  message });
  }

})
router.post("/resendOtp_forgot_password", [body("email",'please Enter a valid Email').isEmail()],
async (req, res)  => {

  

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
            var mes= errors.array()[0];
    return res.status(400).json( {message:mes.msg} );
  }
  try {
      let {email}  = req.body;

      if(!email){
        //  throw Error("Empty User details are not allowed");
         return res.status(400).json({message:"Empty User details are not allowed"});

      } else  {
        const record=  await User.find({
          userId:email,

      });
      if( record.length <= 0){
     
          // throw new Error(" Accound record is Invalid or has been verified already");
          let  message = " Accound record is Invalid";
          res.json({ success: false,  message});
      }
      else{
         await UserOtp.deleteMany({ userId : email});
         sendOtpVerificationEmail({email},res);
         res.json({success:true});
      }
    }
  } catch (error) {
      console.log(error);
      // res.json({
      //     message : error.message,
      // })
      const message="Error while sending the otp! Please try again";
// const useremail=""
  res.json( {  message });
  }

})



// password must be at least 5 chars long

module.exports = router;
