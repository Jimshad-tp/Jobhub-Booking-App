const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')

const authMiddleware = require("../middilewares/authMiddleware");

router.post("/register", async (req, res) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return res.status(400).send({ message: "User Already Registered", });
    }
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body.password = hashedPassword;
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).send({ message: "User created successfully", success: true, });
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error Creating user", success: false });
  }
});




router.post("/login", async (req, res) => {

  try {
    const user = await User.findOne({email : req.body.email})
    if(!user){
      return res.status(200).send({message : 'user does not exists',success:false})
    }
    const isMatch = await bcrypt.compare(req.body.password ,user.password)
    if(!isMatch) {
      return res.status(200).send({message : 'Password is incorrect',success:false})
    }else{
      const token = jwt.sign({id :user._id}, process.env.JWT_SECRET, {
        expiresIn:"1d"
      });
      res.status(200).send({message : "Login successfull",success :true, data :token})
    }

  } catch (error) {
  console.log(error);
   }
});

router.post('/get-user-info-by-id' , authMiddleware, async (req,res) => {
  try {

    const user = await User.findOne({_id : req.body.userId})
    if(!user){
      return res.status(200).send({success :true , data : {
        name :user.name,
        email:user.email
      }})
    }
    
  } catch (error) {
    console.log(error)
  }
})

module.exports = router;
