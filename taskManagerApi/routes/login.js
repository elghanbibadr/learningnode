const express=require('express')
const router=express.Router()
const {User}=require('../models/models')
const bcrypt=require('bcrypt')


router.post("/", async (req, res) => {
    // console.log("hello")
    const { name, email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).send("email and password are required");
    }
  
    //  saving a new user
    try {
      //  check if a user with this email exists
     let user=await User.find({password,email})
       
     return res.send(user ? user : 'user not found');

    
    } catch (e) {
      return res.status(404).send(e.message);
    }
  });

  
module.exports=router