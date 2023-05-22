const Product = require('../models/productModel')
require('dotenv').config();

const findOneProductById = async (id) => {
    return await Product.findOne({ _id: id });
}

const createOneProduct = async (title, image, description, quantity, price, cod, color, delivery, id) => {
    return await Product.create({
        title: title,
        image: image,
        description: description,
        quantity: quantity,
        price: price,
        attributes: {
            cod: cod,
            color: color,
            delivery: delivery,
        },
        cid: id
    })
}

const findOneProductByIdAndUpdate = async (id, updateValue) => {
    return await Product.findByIdAndUpdate(id, updateValue)
}

const deleteOneProduct = async (id) => {
    return await Product.deleteOne({ _id: id });
}

module.exports = {
    findOneProductById, createOneProduct, findOneProductByIdAndUpdate, deleteOneProduct
}