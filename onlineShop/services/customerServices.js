require('dotenv').config();
const Customers = require('../models/customerModel')

const findOneCustomerById = async (id) => {
    return await Customers.findOne({_id: id});
}

const findOneCustomerByEmail = async (email) => {
    return await Customers.findOne({email: email});
}

const createOneCustomer = async (name, email, phone, address, password) => {
    return await Customers.create({
        name,
        email,
        phone,
        address,
        password,
        
    })
}

const findOneCustomerByIdAndUpdate = async (id, updateValue) => {
    return await Customers.findByIdAndUpdate(id, updateValue)
}

const deleteOneCustomer = async (id) => {
    return await Customers.deleteOne({_id: id});
}

module.exports = {
    findOneCustomerById, 
    createOneCustomer,
    findOneCustomerByIdAndUpdate,
    deleteOneCustomer,
    findOneCustomerByEmail
}