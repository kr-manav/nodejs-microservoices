const { mongoose } = require('mongoose');
const connectDb = async () => {
    try{
        await mongoose.connect(process.env.CONNECTION_STRING);

    }catch(error){
        console.error(error);
        process.exit(1);
    }
}

module.exports={connectDb}