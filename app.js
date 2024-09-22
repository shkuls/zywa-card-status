const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const cronJob = require('./utils/cronJob')
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per 15 minutes
});
app.use(limiter);
app.use(bodyParser.json());
app.use(cors());

function authMiddleware(req, res, next) {
  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) return res.status(401).send('Access denied');

  try {
    const verified = jwt.verify(token, 'hi');
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).send("Invalid Token");
  }
}

app.get("/" , authMiddleware,(req,res)=>{
    res.send("verified")
})
cronJob()
app.get("/get_card_status" , (req, res)=>{
  const input =req.query.input;
  let phoneNumber;
  let cardId;
   //add validators for phone and cardid
  if(input[0] == "Z")
    cardId = input;
  else
    phoneNumber = input;

    console.log(phoneNumber , cardId)
})

module.exports = app;