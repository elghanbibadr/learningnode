const express=require('express');
const mongoose=require('mongoose')
const app=express()
const router=express.Router();

function generateRandomId() {
    // Create a random 24-character string
    return (Math.random().toString(16).substring(2) + Math.random().toString(16).substring(2)).substring(0, 24);
  }


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
    name:{type:String,required:true}
})

// CLASS MODULE
const Genres=mongoose.model("Genres",genreSchema)

async function createGenre(){
    const genre=new Genres({
        id:generateRandomId(),
        name:"action"
    })
    try{
        const result=await genre.save();

    }catch(e){
        console.log("error creating genres",e.message)
    }
}



// createGenre()

// getting all genres from the db
app.get('/',async (req,res) => {
  try{
    const genres=await Genres.find()
    res.send(genres)
  }catch(e){
    return res.send({error:e.message})
  }
})


// getting genres by id

app.get('/:id',async (req,res) => {
  const id=req.params.id
  try{
    const genre=await Genres.findById(id)
    if(genre){
      res.send(genre)
    }else{
      res.send("no genres found").status(404)
    }
  }catch(e){
    res.send(e.message)
  }
  
})


// listening for changes

app.listen('3000',()=>{
  console.log("app listening")
})
