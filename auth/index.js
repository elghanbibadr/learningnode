const express=require('express');
const mongoose=require('mongoose')
const app=express()

app.use(express.json()); 

const mongoURI = 'mongodb://localhost:27017/vidly'; // Use your MongoDB URI

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit process with failure
    }
  };

// USER SCHEMA

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        minLength:4,
        maxLength:50,
        required:true,

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
        maxLength:50,
        required:true,
    }
}) 

const User=mongoose.model("User",userSchema)




connectDB()  
