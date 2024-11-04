const mongoose=require('mongoose')

const mongoURI = 'mongodb://localhost:27017/taskManager'; 

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

module.exports={connectDB }