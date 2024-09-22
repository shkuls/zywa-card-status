const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  status: {type : String , default : "No Status"},
  comment:{type : String , default : "None"},
  timestamp: { type: String, default: "None" }
})

const cardSchema = new mongoose.Schema({
  cardId: { type: String , uniqure : true },
  phoneNumber: { type: String},
  info : {
    type : [infoSchema]
  },


});



const Card = mongoose.model("Card", cardSchema);


module.exports = Card;