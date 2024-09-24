const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const Card = require("./Models/card.model");

const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per 15 minutes
});
app.use(limiter);
app.use(bodyParser.json());
app.use(cors());

app.get("/get_card_status" , (req, res)=>{
  const input =req.query.input;
  let phoneNumber;
  let cardId;

  if(input[0] == "Z")
    cardId = input;
  else
    phoneNumber = input;

    console.log(phoneNumber , cardId)

    Card.findOne({
      $or: [
        { cardId: input },
        { phoneNumber: input }
      ]
    }).then((document)=>{
      
      res.send({ID : document.cardId , PhoneNumber : document.phoneNumber  ,LatestStatus : document.latestStatus , History : document.info})
    })
})

module.exports = app;