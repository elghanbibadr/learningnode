const express=require('express');
const mongoose=require('mongoose')
const app=express()

const users=require("./routes/users")
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



app.use("/api/users",users)



connectDB()  
// Set up a port and start listening
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


