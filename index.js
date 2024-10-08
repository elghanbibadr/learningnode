const express=require('express');
const mongoose=require('mongoose')
const app=express()

app.use(express.json()); 

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

function generateRandomId() {
  // Create a random 24-character string
  return (Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)).substring(0, 24);
}


// CREATE A SHCEMA THAT DEFINES THE SHAP OF ALL COURSES
const courseSchema=new mongoose.Schema({
    _id: String,
    name:{ type:String , required:true},
    author:String,
    tags:{
      type:Array,
      validate:{
        validator:function(v){
          return v.length > 0 ;
        },
        message:"course should have at least one tag"

      }
    },
    date:{type:Date, default: Date.now()},
    isPublished:Boolean,
    category:{
      type:String,
      required:true,
      enum:["web","mobile","network"]
    },
    price:Number
    
})


// CREATE A CLASS MODAL FROM THAT SCHEMA
const Course=mongoose.model('Course',courseSchema);



// async function createCourse(params) {
//   const course=new Course({
//     name:'angular',
//     author:"mosh",
//     tags: ["front end"],
//     isPublished:true
  
//   })
//   const result=await course.save()
//   console.log("result",result)
// } 





async function updateCourse(id){
  const course=await Course.findById("5a68fdc3615eda645bc6bdec")
  console.log("finded course",course)
  if(!course)return
  course.set({isPublished:true,author:'another author'});
  const result= await course.save()
  console.log("updated course",result)
}


// updateCourse()

// GET 
app.get('/',async (req,res) => {
  try{
   
    const courses=await Course.find();
     res.json(courses);  // Send the courses as JSON
  }catch(e){
    res.status(500).send("An error occurred",e);  }
})


// DELETE


app.delete('/:id',async (req,res) =>{
  const {id}=req.params
  if(!id)return res.json("id not found").status(404)
    
    // GET THE COURSE FROM THE DB
  const course=await Course.findById(id)
  if(!course)return res.json("no course with the given id found").status(503)
  
  // delete the course
  const result=await Course.deleteOne({_id:id})
 return res.json(result)
})


// ADD NEW COURSE

app.post("/",async (req,res)=>{
  try{
    // const body=req.body
    const { name, author, tags, isPublished, price,category } = req.body;

    const newCourse = new Course({
     _id:generateRandomId(),
      ...req.body
    });
 
  //  await newCourse.validate()
    const result=await newCourse.save()


    console.log("new course",result)
    //  await newCourse.save();

    // console.log("course saved:", savedCourse); // 
    return res.json("course saved")

  }catch(e){
    console.log("error saving",e.message)
    return res.json({error:e.message})
  }
})

app.listen('3000',()=>{
    console.log('app listening on port 3000')
})