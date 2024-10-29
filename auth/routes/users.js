const {User}=require('../model/userModel')
const express=require('express');
const mongoose=require('mongoose')
const router=express.Router()


router.post('/',async(req,res)=>{
  
 const {email,password}=req.body

 if(!email || !password){
    return res.status(400).send("email and password are required")
 }

//  saving a new user
 try{

    let user=new User({email,password})
     user=await user.save()
    res.send(user)

 }catch(e){
    return res.status(404).send(e.message)
 }
})










module.exports=router;