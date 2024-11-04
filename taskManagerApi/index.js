const express=require('express');
const mongoose=require('mongoose')
const app=express()
const register=require('./routes/register')
const {connectDB}=require('./db/db')
app.use(express.json()); 

connectDB()

app.use('api/register',register)

