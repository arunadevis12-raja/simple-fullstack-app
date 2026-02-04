const express = require('express');
const cors=require('cors');
const mongoose = require('mongoose');
const User=require("./models/User");


const app=express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/simple_fullstack")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

let users=[];

app.get('/',(req,res)=>{
    res.send('Node.js server is running');
});

app.post('/register',async (req,res)=>{
    const{name,email,password}=req.body;
      console.log("Incoming data:", req.body);

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "User already exists" });
   }
    const user=new User({name,email,password});
      const savedUser = await user.save();
          console.log("Saved user:", savedUser);
   
      res.json({ message: "User registered successfully" });

});

app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log(email, password); // debug

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // plain password check (for now)
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({ message: 'Login successful' });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});



app.get("/",(req,res)=>{
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});