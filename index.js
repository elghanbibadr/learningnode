const express=require('express');
const mongoose=require('mongoose')
const app=express()


const mongoURI = 'mongodb://localhost:27017/school'; // Use your MongoDB URI

const connectDB = async () => {
    try {
      await mongoose.connect(mongoURI);
      console.log('MongoDB connected successfully');
    } catch (err) {
      console.error('MongoDB connection error:', err);
      process.exit(1); // Exit process with failure
    }
  };
connectDB()  

app.get('/',(req,res) => {
   return  ('hello world') ;
})

app.listen('3000',()=>{
    console.log('app listening on port 3000')
})