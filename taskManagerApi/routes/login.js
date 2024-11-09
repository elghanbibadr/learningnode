const express = require("express");
const router = express.Router();
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken') 
const config=require('config')


router.post("/", async (req, res) => {
  // console.log("hello")
  let { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("email and password are required");
  }

  try {
    //  CHECKING IF A THERE IS A USER WITH THIS EMAIL
    let user = await User.findOne({ email });
    if (!user) return res.send("Invalid Email or password");
    // HACHING USER PASSWORD
    const isValidPassword = await bcrypt.compare(password, user.password);
    //  CHECKING IF USER PASSWORD CORRECT
    if (!isValidPassword)return res.status(400).send("Invalid Email or password");
    // GENETARING JWT
    const token= jwt.sign({_id:user._id},config.get('jwtPrivateKey'))
    return res.send(token);
  } catch (e) {
    return res.status(404).send(e.message);
  }
});

module.exports = router;
