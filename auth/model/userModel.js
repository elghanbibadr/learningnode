// USER SCHEMA

const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength:4,
        maxLength:50,
        // required:true,

    },
    email:{
        type:String,
        minLength:4,
        maxLength:50,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minLength:4,
        maxLength:255,
        required:true,
    }
}) 

const User=mongoose.model("User",userSchema)


module.exports={User}

