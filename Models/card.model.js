const mongoose = require("mongoose");

const infoSchema = new mongoose.Schema({
  statusCode : {type : Number , default : 1},
  status: {type : String , default : "No Status"},
  comment:{type : String , default : "None"},
  timestamp: { type: String, default: "None"}
})

const cardSchema = new mongoose.Schema({
  cardId: { type: String , unique : true },
  phoneNumber: { type: String , unique : true},
  latestStatus :{type : infoSchema},
  info : {
    type : [infoSchema],
    unique: true
  }


});



const Card = mongoose.model("Card", cardSchema);


module.exports = Card;