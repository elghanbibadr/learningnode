const express=require('express');
const mongoose=require('mongoose')
const app=express()


const mongoURI = 'mongodb://localhost:27017/playground'; // Use your MongoDB URI

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


// CREATE A SHCEMA THAT DEFINES THE SHAP OF ALL COURSES
const courseSchema=new mongoose.Schema({
    name:String,
    author:String,
    tags:[String],
    date:{type:Date, default: Date.now()},
    isPublished:Boolean,
    
})


// CREATE A CLASS MODAL FROM THAT SCHEMA
const Course=mongoose.model('Course',courseSchema);



async function createCourse(params) {
  const course=new Course({
    name:'angular',
    author:"mosh",
    tags: ["front end"],
    isPublished:true
  
  })
  const result=await course.save()
  console.log("result",result)
} 



async function getCourses(){
 const courses=await Course.find().or([{author:"mos"},{isPublished:"true"}])
 console.log("courses",courses)
}


getCourses()
app.get('/',(req,res) => {
   return  ('hello world') ;
   const students=m
})

app.listen('3000',()=>{
    console.log('app listening on port 3000')
})