const {User}=require('../model/userModel')
const express=require('express');
const mongoose=require('mongoose')
const router=express.Router()


router.post('/',async(req,res)=>{
  
 const {name,email,password}=req.body

 if(!email || !password){
    return res.status(400).send("email and password are required")
 }

//  saving a new user
 try{  
    //  check if a user with this email exists

    let user=await User.findOne({email})
    if(user){
        return res.status(400).send("User already registered !")
    }
     user=new User({name,email,password})
     user=await user.save()
    res.send(user)

 }catch(e){
    return res.status(404).send(e.message)
 }
})










module.exports=router;