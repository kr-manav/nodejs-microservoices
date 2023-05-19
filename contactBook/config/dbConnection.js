const { MongoClient } = require('mongodb');
const { default: mongoose } = require('mongoose');
const connectDb = async () => {
    try{
        const client = await mongoose.connect(process.env.CONNECTION_STRING);

    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports={connectDb}