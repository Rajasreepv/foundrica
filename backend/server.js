const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const cookie = require("cookie-parser");
require("dotenv").config();
const path = require("path");
const bcrypt = require("bcrypt");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
// app.use(express.static(path.join(__dirname, "../frontend/public/index.html")));
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./frontend/build/index.html"));
});

// database connection
mongoose
  .connect(
    "mongodb+srv://rajasree:86V7ey4jfO0IDpVa@cluster0.rmboc97.mongodb.net/foundericaweb",

    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("db connected");
  });

const Userschema = new mongoose.Schema({
  username: String,
  password: String,
  isRegEvent: Boolean,
  phone:Number,
  events:String,
  date:Date,
  dept:String
});

const User = new mongoose.model("User", Userschema);

app.post("/contact", (req, res) => {
  const { fullname, email, contact, msg } = req.body;

  console.log(fullname, email, contact, msg);
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });
  var mailOptions = {
    from: "rajasreepv02@gmail.com",
    to: "rjzre02@gmail.com",
    subject: "Message from Client",
    html: `
    <ul>
    <li><h1 style='color:"red"'>Name:${fullname}</h1></li>
    <li><h1 style='color:"red"'>Email :${email}</h1></li>
    <li><h1 style='color:"red"'>Contact:${contact}</h1></li>
    <li><h1 style='color:"red"'>Message : ${msg}</h1> </li>
   
    </ul>
    `,
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      console.log(err);
    } else {
      res.json("mailsent");
    }
  });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.json("fillfields");
  } else {
    User.findOne({ username: username }).then((founduser) => {
      // console.log(user.username);

      if (founduser && founduser.username === username) {
        res.json("exist");
      } else {
        bcrypt.hash(password, 3, function (err, hash) {
          const user = new User({
            username: req.body.username,
            password: hash,
            isRegEvent: false,
          });
          user.save();

          const accessToken = jwt.sign({ id: user.id }, "mySecretKey");
          res.cookie("access_token", accessToken, {
            httpOnly: true,
            secure: true, // set this to true if you are using HTTPS
          });
          res.json({
            username: user.username,
            accessToken,
          });
        });
      }
    });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "" || password === "") {
    res.json("fillfields");
  } else {
    User.findOne({ username: username }).then((user) => {
      // console.log(user.username);
if(user){
      const istrue = bcrypt.compare(password, user.password);
      // logined user for testing purpose rjzre@gmail.com paswword: rjzre
      if (user && user.username === username && istrue) {
        const accessToken = jwt.sign({ id: user.id }, "mySecretKey");
        res.cookie("access_token", accessToken, {
          httpOnly: true,
          secure: true,
        });
        res.json({
          username: user.username,
          accessToken,
        });
      } }else {
        res.json("doesntexist");
      }
    });
  }
});
const verifyToken = (req, res, next) => {
  const accessToken = req.cookies.access_token;
  if (!accessToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  try {
    const decoded = jwt.verify(accessToken, "mySecretKey");
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({ error: "Invalid token" });
  }
};

// function authenticateToken(req, res, next) {
//   const authHeader = req.headers["authorization"];
//   const token = authHeader && authHeader.split(" ")[1];
//   if (token == null) return res.sendStatus(401);
//   jwt.verify(token, "mySecretKey", (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// }

app.post("/eventregister", (req, res) => {
  const email = req.body.email;

 
  
  User.findOne({ username: email }).then(function (user) {
    if (user) {
      if (user.isRegEvent == true) {
        res.json("alreadyregistered");
      } else {
        res.json("notregistered");
      }
    }
  });
});




app.post("/verify", (req, res) => {
  const paymentid = req.body;
  const email = req.body.email;
  const phone = req.body.phone;
  const events=req.body.eventis;
  const dept=req.body.dept;
const date=req.body.date;
console.log(paymentid,email,phone,events,dept);
  if (paymentid) {
    User.findOneAndUpdate({ username: email }, { isRegEvent: true,phone:phone,events:events,date:date,dept:dept }).then(function (
      err
    ) {
      if (err) {
        console.log(err);
      } else {
        console.log("success");
      }
    });
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("access_token");
  res.redirect("/");
});

app.post("/regilogin",(req,res)=>{
  username=req.body.username;

 User.findOne({username:username}).then((user)=>{
  
  if(user.isRegEvent==true)
 {
  res.json(true)
 }
 });
 
})
app.post("/getregdata",(req,res)=>{
const username=req.body.username;

User.findOne({username:username}).then((user)=>{
  console.log("Updated user after registration",user);
  res.json(user);
})
})
app.listen(8080, () => {
  console.log("server connected to 8080");
});
