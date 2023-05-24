const { default: mongoose } = require('mongoose')

const orderSchema = new mongoose.Schema({
    
    cid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the title"],
        ref: "Cutomers"
    },
    pid: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Please add the image"],
        ref: "Products"
    },
    quantity: {
        type: Number,
        required:[true, "Please add the quantity"],
    },
    orderAmount: {
        type: Number,
        required: [true, "Please add the total order amount"]
    },
    deliveryDone: {
        type: Boolean,
        required: [true, "Please add the description"],
    },
    orderCancelled: {
        type: Boolean,
        default: false
    },
    deliveryDate: {
        type: String,
        required: [true, "Please add the quantity"],
    },
    deliveryAddress: {
        type: String,
        required: [true, "Please add the quantity"],
    },
    receiverPhone: {
        type: Number,
        required: [true, "Please add the number"],
    },
    paymentMethod: {
        type: String,
        enum: ['COD', 'UPI', 'DEBIT', 'CREDIT'],
        default: 'COD',
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Orders", orderSchema);