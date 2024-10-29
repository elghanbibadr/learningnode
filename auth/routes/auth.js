const { User } = require("../model/userModel");
const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt=require('bcrypt')

router.post("/", async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send("email and password are required");
    }
  
    try {
      //  check if a user with this email and passwrd exists

     let user=await User.findOne({email})
     if(!user){
        return res.status(400).send("Invalid email or password")
     }
    
     const validPassword=await bcrypt.compare(password,user.password)
    if(!validPassword){
        return res.status(400).send("Invalid email or password")

    }
    return res.send(user)
    } catch (e) {
      return res.status(404).send(e.message);
    }
  });
  

module.exports=router