const mongoose = require('mongoose');


const connectMongoose = async () => {
    try{    
        await mongoose.connect(process.env.MONGO_URL);
        console.log('mongodb connected successfully');
    }catch(err){
        console.log(err);
    }
}

module.exports = connectMongoose;