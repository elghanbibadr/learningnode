
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



const tasksSchema=new mongoose.Schema({
    title:{
        type:String,
        minLength:2,
        maxLength:50,
        required:true,

    },
    description:{
        type:String,
        minLength:4,
        maxLength:255,
    },
    dueDate:{
        type:Date,
      
        required:true,
    },
    priority:{
        type:String,
        enum: ['low', 'medium', 'high', 'urgent'], // Enum values for priority
    },
    status: {
        type: String,
        enum: ['pending', 'completed', 'in-progress', 'canceled'], // Another example enum for task status
        default: 'pending'
      }
}) 

const Tasks=mongoose.model("Task",tasksSchema)


module.exports={User}
