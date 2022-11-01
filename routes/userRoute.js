const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const Application = require('../models/applicationModel')
const authMiddleware = require("../middilewares/authMiddleware");
const Slot = require("../models/slotModel")


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
    const user = await User.findOne({ email: req.body.email })
    console.log(user);
    if (!user) {
      return res.status(200).send({ message: 'user does not exists', success: false })
    }else if (user.status === 'Active'){
    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) {
      return res.status(200).send({ message: 'Password is incorrect', success: false })
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d"
      });
      res.status(200).send({ message: "Login successfull", success: true, data: token })
    }
  }
  return res.status(200).send({ message: 'User Blocked', success: false })
  } catch (error) {
    console.log(error);
  }
});

router.post('/get-user-info-by-id', authMiddleware, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.body.userId })
    const password = undefined
    if (!user) {
      return res
        .status(200)
        .send({ message: "User does not exist", success: false })
    } else {
      const Applicaton = await Application.findOne({ userId: req.body.userId })
      return res.status(200).send({ success: true, data: user, Application })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error getting user info", success: false, error })
  }
});

router.post("/form", authMiddleware, async (req, res) => {
  try {
    const newForm = new Application({ ...req.body })
    await newForm.save()
    res.status(200).send({ message: "Application Registered", success: true })
  } catch (error) {
    res.status(500).send({ message: "Error getting user info", success: false, error })+
    res.render('/form')
    console.log(error);
  }
});

router.post("/get-one-apps", authMiddleware, async (req, res) => {
  try {
    const userId = req.body.userId
    const applications = await Application.find({ userId }).populate('slot').exec()
    res.status(200).send({ message: "application data fetched successfully", success: true, data: applications })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: "Error getting user info", success: false, error })
  }
});




module.exports = router;

