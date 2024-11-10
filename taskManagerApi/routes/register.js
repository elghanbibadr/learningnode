const express = require("express");
const router = express.Router();
const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const jwt=require('jsonwebtoken') 

router.post("/", async (req, res) => {
  let  { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("email and password are required");
  }

  //  saving a new user
  try {
    //  check if a user with this email exists

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).send("User already registered !");
    }

    // HASHING PASSWORDS
    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);
    user = new User({ name, email, password });
    await user.save();

    // GENERATING JWT
    const token= jwt.sign({_id:user._id},'jwtPrivateKey')

    // SETTING THE RESPONSE HEADER
    res.header('x-auth-token',token).send(token)
    return res.send(token);

  } catch (e) {
    return res.status(404).send(e.message);
  }
});

module.exports = router;
