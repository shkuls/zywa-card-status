const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const rateLimit = require('express-rate-limit');
const Card = require("./Models/card.model");
const helmet = require('helmet');
const app = express();
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100 // 100 requests/15 minutes for each IP
});
app.use(limiter);
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());

app.get("/get_card_status", (req, res) => {
  const input = req.query.data;


  if ((input.length == 7 && input.slice(0, 3) == "ZYW") || input.length == 9) {

    Card.findOne({
      $or: [
        { cardId: input },
        { phoneNumber: input }
      ]
    }).then((document) => {
      if (document)
        res.send({ ID: document.cardId, PhoneNumber: document.phoneNumber, LatestStatus: document.latestStatus, History: document.info })
      else
        res.send("No card found.")
    })
  }
  else {
    res.send("Invalid Card ID or Phone Number")
  }




})

module.exports = app;