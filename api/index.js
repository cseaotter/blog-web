const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const User = require("./models/User");
const bcrypt = require('bcryptjs');
const app = express();
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const salt = bcrypt.genSaltSync(10);
const secret = 'asdfe45we45w345wegw345werjktjwertkj';

app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use(express.json());
app.use(cookieParser());

mongoose.connect("mongodb+srv://newblog:P3awWEVKiQfsss2p@cluster0.gctdto0.mongodb.net/?retryWrites=true&w=majority");

app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const userDoc = await User.create({username, password:bcrypt.hashSync(password, salt), });
    res.json(userDoc);
  } catch (error) {
    res.status(400).json(error);
  }
});

app.get("/register", (req, res)=>{
    res.send("happy coding");
});

app.post('/login', async (req,res) => {
  const {username,password} = req.body;
  const userDoc = await User.findOne({username});
  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (passOk) {
    // logged in
    jwt.sign({username,id:userDoc._id}, secret, {}, (err,token) => {
      if (err) throw err;
      res.cookie('token', token).json({
        id:userDoc._id,
        username,
      });
    });
  } else {
    res.status(400).json('wrong credentials');
  }
});

app.get("/login", (req, res)=>{
  res.send("happy login");
})

app.get('/profile', (req,res) => {
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, (err,info) => {
    if (err) throw err;
    res.json(info);
  });
});

app.post('/logout', (req,res) => {
  res.cookie('token', '').json('ok');
});

app.get("/logout", (req, res)=>{
  res.send("happy logging out");
})

app.listen(4000);
//H8kLSNYdDTOp2gYJ

//mongodb+srv://blog:H8kLSNYdDTOp2gYJ@cluster0.vsn4g1m.mongodb.net/?retryWrites=true&w=majority

//second: DNsY4b1jSpWihopJ

//newblog: P3awWEVKiQfsss2p
