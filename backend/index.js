const express = require('express');
const fs = require("fs");
const path = require("path");
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

const usersFile = path.join(__dirname, "users.json");

// Create users.json if it doesn't exist
if (!fs.existsSync(usersFile)) {
  fs.writeFileSync(usersFile, "[]");
}


let users=[];

app.get('/',(req,res)=>{
    res.send('Node.js server is running');
});

app.post('/register',(req,res)=>{
    const{name,email,password}=req.body;
      const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));

    users.push({name,email,password});
      fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));

    res.json({message:'User registered successfully'});
});

app.post('/login',(req,res)=>{
    const {name,email,password}=req.body;
      const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));

    const user=users.find(
        u=>u.email==email && u,password==password
    );

    if(user){
        res.json({message:'Login successful',user});
    }else{
        res.status(401).json({message:'Invalid User'});
    }
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});