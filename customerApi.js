const express=require('express');
const mongoose=require('mongoose')
const app=express()
const router=express.Router();
// Middleware to parse JSON bodies
// app.use(express.json());


// connecting to the db

const dbUrl = "mongodb://localhost:27017/vidly";

const connectDb = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("connecting successfully to db");
  } catch (e) {
    console.log("error connecting to db", e.message);
  }
};

connectDb();


// defining the customer modal

const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true, length: 5 },
});
const Customer = mongoose.model("Customer", customerSchema);



// GET CUSTOMERS ENDPOINT
app.get('/', async (req, res) => {
    console.log("Fetching customers...");
    try {
      const customers = await Customer.find();
      console.log("Customers found:", customers);
      res.send(customers);
    } catch (e) {
      console.error("Error fetching customers:", e.message);
      res.status(500).send({ error: e.message });
    }
  });


  // getting genres by id

app.get('/:id',async (req,res) => {
    const id=req.params.id
    try{
      const genre=await Customer.find({name:"badr"})
      if(genre){
        res.send(genre)
      }else{
        res.send("no genres found").status(404)
      }
    }catch(e){
      res.send(e.message)
    }
    
  })

app.listen("3000", () => {
  console.log("app listening on port 3000");
});
