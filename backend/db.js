const mongoose = require('mongoose');
const mongoURI = MONGO_URI;

const connecToMongo = async()=>{
    try {
        await mongoose.connect(mongoURI);
      } catch (error) {
        console.log(error);
      }
}

module.exports = connecToMongo;
