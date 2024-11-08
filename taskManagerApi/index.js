const express=require('express');
const mongoose=require('mongoose')
const app=express()
const register=require('./routes/register')
const login=require('./routes/login')
const {connectDB}=require('./db/db')
app.use(express.json()); 

connectDB()

app.use('/api/register',register)
app.use('/api/login',login)

app.listen(3000, () => console.log(`Server is running on port 3000`));

