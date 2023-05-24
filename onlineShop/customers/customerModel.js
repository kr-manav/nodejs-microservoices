const { default: mongoose } = require('mongoose')

const customerSchema = new mongoose.Schema({
    
    name: {
        type: String,
        required: [true, "Please add the contact name"],
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"],
    },
    phone: {
        type: Number,
        required: [true, "Please add the contact number"],
    },
    address: {
        type: String,
        required: [true, "Please add the address.."],
    },
    password: {
        type: String,
        required: [true, "Please enter the password"],
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Customers", customerSchema);