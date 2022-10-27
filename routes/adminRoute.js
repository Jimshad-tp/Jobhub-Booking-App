const express = require("express");
const router = express.Router()
const User = require("../models/userModel");
const authMiddleware = require("../middilewares/authMiddleware");
const Application = require('../models/applicationModel')
const Slot = require('../models/slotModel')


router.get("/get-all-users", authMiddleware, async (req, res) => {
  try {

    const users = await User.find({})

    res.status(200).send({ message: "users data fetched successfully", success: true, data: users })
  } catch (error) {

    console.log(error)
    res.status(500).send({ message: "Error getting user info", success: false, error })
  }
});

router.post("/change-user-status", async (req, res) => {
  try {

    const { _id, status } = req.body;
    const user = await User.findByIdAndUpdate(_id, {
      status,
    })

    return res.status(200).send({ message: "user status changed", success: true, data: user })


  } catch (error) {

    console.log(error)
    res.status(500).send({ message: "Error user does not changed", success: false, error })
  }
});

router.post("/change-form-status", async (req, res) => {
  try {

    const { _id, status } = req.body;
    const apps = await Application.findByIdAndUpdate(_id, {
      status,
    })

    return res.status(200).send({ message: "user application form approved", success: true, data: apps })


  } catch (error) {

    console.log(error)
    res.status(500).send({ message: "Error applying user form", success: false, error })
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

router.post("/slot", async (req, res) => {
  try {
    const addSlot = new Slot(req.body)
    await addSlot.save()
    console.log(addSlot);
    res.status(200).send({ message: "Slot added successfully", success: true })


  } catch (error) {
    res.status(500).send({ message: "Error getting slot adding process", success: false, error })
    console.log(error);
  }
});

router.get("/getslot", async (req, res) => {
  try {
    const slotlist =  await Slot.find({})
  

    res.status(200).send({ message: "fetch slot successfully", success: true, data:slotlist })


  } catch (error) {
    res.status(500).send({ message: "Error fetching slots", success: false, error })
    console.log(error);
  }
});


module.exports = router;