const { default: mongoose } = require('mongoose')

const productSchema = new mongoose.Schema({
    cid: {
        type: String,
        required: [true, "Please add customer id"],
        ref: "Customers"
    },
    title: {
        type: String,
        required: [true, "Please add the title"],
    },
    image: {
        type: String,
        required: [true, "Please add the image"],
    },
    description: {
        type: String,
        required: [true, "Please add the description"],
    },
    quantity: {
        type: Number,
        required: [true, "Please add the quantity"],
    },
    price: {
        type: Number,
        required: [true, "Please add the price"]
    },
    attributes: {
        cod: {
            type: Boolean,
            required: [true, "Please add if the cod is available or not"]
        },
        color: {
            type: String,
            required: [true, "Please add the color of the product"],
        },
        delivery: {
            type: String,
            required: [true, "Please add the days for delivery"]
        }
    }
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Products", productSchema);