const express=require('express')
const {Task}=require('../models/models')
const router=express.Router()

router.post("/", async (req, res) => {
    let  { title,description,priority ,dueDate,status,userId } = req.body;
  
    if (!title || !priority || !dueDate || !status || !userId) {
        return res.status(400).send("all the informations requird");
      }
    
  return res.send({title})
  
  
  });

  module.exports = router;
