const express=require('express');
const { Mongoose } = require('mongoose');
const mongoose=require('mongoose')
const app=express()
const router=express.Router();


// CONNECT TO MONGODB

const dbUrl='mongodb://localhost:27017/vidly'; // Use your MongoDB URI

const connectDB = async () => {
    try {
      await mongoose.connect(dbUrl);
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit process with failure
    }
  };

  connectDB()
// DEFINE THE SCHEME FOR GENRES WITH MONGOSE


const genreSchema=new mongoose.Schema({
    id:String,
    name:{type:String,required:true}
})



// CLASS MODULE
const Genres=mongoose.model("Genres",genreSchema)


