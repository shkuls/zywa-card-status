const mongoose = require('mongoose');
const Card = require('../Models/card.model');
const readCSVFiles = require('./csvReader');


const cronJob = async() =>{
    
    const CardDataArray = await readCSVFiles();
    CardDataArray.map(async(card)=>{
        const ID = card['Card ID']
        console.log(ID)
        phone = card['User contact'] || card['User Mobile'];
        //         newCard.phoneNumber = phone.slice(phone.length - 9, phone);
        // Card.findOneAndUpdate({["cardId"]: ID} , )
        // .then((document) => {
        //     if (document) {
        //     //   document.info.push({status : card.status ,comment :card.Comment ,timestamp:card.Timestamp })
        //     console.log(document)
              
        //     } else {
                
        //         const newCard = Card();
        //         newCard.cardId = ID;
        //         phone = card['User contact'] || card['User Mobile'];
        //         newCard.phoneNumber = phone.slice(phone.length - 9, phone);
        //         newCard.info.push({status : card.status ,comment :card.Comment ,timestamp:card.Timestamp })
              
                
        //         newCard.save()
        //         console.log("card saved")
        //     }
        //   })
        //   .catch((error) => {
        //     console.log("Error finding document:", error);
        //   });
       
        const newInfo = {status : card.status ,comment :card.Comment ,timestamp:card.Timestamp }
        const updatedCard = await Card.findOneAndUpdate(
            { ["cardId"]: ID },
            {
              $push: { info: newInfo },  // Append new status to the info array
              $setOnInsert: { cardId : ID, phoneNumber :phone }  // If card doesn't exist, insert cardId and phoneNumber
            },
            { new: true, upsert: true }  // Create a new document if cardId doesn't exist
          );

          
    })
}

module.exports = cronJob;