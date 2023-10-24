const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://shivamgupta310570:Arya098765@cluster0.boqljxq.mongodb.net/?retryWrites=true&w=majority"

const connecToMongo = async()=>{
    try {
        await mongoose.connect(mongoURI);
      } catch (error) {
        console.log(error);
      }
}

module.exports = connecToMongo;