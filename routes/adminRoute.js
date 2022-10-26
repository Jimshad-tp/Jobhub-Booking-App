const express = require("express");
const router = express.Router()
const User = require("../models/userModel");
const authMiddleware = require("../middilewares/authMiddleware");
const Application = require('../models/applicationModel')


router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {

    const users = await User.find({})

    res.status(200).send({ message: "users data fetched successfully", success: true, data: users })
  } catch (error) {

    console.log(error)
    res.status(500).send({ message: "Error getting user info", success: false, error })
  }
});

router.post("/app-approve", async (req, res) => {
  try {

    const { _id, status } = req.body;
    const user = await User.findByIdAndUpdate(_id, {
      status,
    })

    return res.status(200).send({ message: "user application approved", success: true, data: user })


  } catch (error) {

    console.log(error)
    res.status(500).send({ message: "Error applicaton approving", success: false, error })
  }
});

router.get("/get-all-apps", async (req, res) => {
  try {

    const applications = await Application.find({})
console.log(applications)
    res.status(200).send({ message: "application data fetched successfully", success: true, data: applications })
  } catch (error) {

    console.log(error)
    res.status(500).send({ message: "Error getting user info", success: false, error })
  }
});

module.exports = router;