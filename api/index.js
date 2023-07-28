const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const User = require("./models/User");
const bcrypt = require('bcryptjs');
const app = express();

const salt = 'sdfgdsfsdafa'; //some random string

app.use(cors());
app.use(express.json());

// const DB_PASSWORD = "H8kLSNYdDTOp2gYrsJ";

// mongoose.connect(
//   `mongodb+srv://blog:${DB_PASSWORD}@cluster0.vsn4g1m.mongodb.net/blog-web?retryWrites=true&w=majority`,  { useNewUrlParser: true, useUnifiedTopology: true }
// );

mongoose.connect("mongodb+srv://newblog:P3awWEVKiQfsss2p@cluster0.gctdto0.mongodb.net/?retryWrites=true&w=majority");

// app.post("/register", async (req, res) => {
//     const { username, password } = req.body;
//     console.log("Received request to register user:", username);
//     try {
//       const userDoc = await User.create({ username, password });
//       console.log("User registered:", userDoc);
//       res.json(userDoc);
//     } catch (error) {
//       console.error("Error while registering user:", error.message);
//       res.status(500).json({ error: "Failed to register user" });
//     }
//   });

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
})

app.listen(4000);
//H8kLSNYdDTOp2gYJ

//mongodb+srv://blog:H8kLSNYdDTOp2gYJ@cluster0.vsn4g1m.mongodb.net/?retryWrites=true&w=majority

//second: DNsY4b1jSpWihopJ

//newblog: P3awWEVKiQfsss2p
