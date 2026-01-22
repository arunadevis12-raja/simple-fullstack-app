const express = require('express');
const cors=require('cors');

const app=express();
app.use(cors());
app.use(express.json());

let users=[];

app.get('/',(req,res)=>{
    res.send('Node.js server is running');
});

app.post('/register',(req,res)=>{
    const{name,email,password}=req.body;
    users.push({name,email,password});
    res.json({messge:'User registered successfully'});
});

app.post('/login',(req,res)=>{
    const {name,email,password}=req.body;
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