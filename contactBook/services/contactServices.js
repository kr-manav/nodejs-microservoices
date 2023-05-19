require('dotenv').config();
const Contact = require('../models/contactModel')

const findOneContactById = async (id) => {
    return await Contact.find({user_id: id});
}

const createOneContact = async (name, email, phone, id) => {
    return await Contact.create({
        name,
        email,
        phone,
        user_id: id
    })
}

const findOneContactByIdAndUpdate = async (id, updateValue) => {
    return await Contact.findByIdAndUpdate(id, updateValue)
}

const deleteOneContact = async (id) => {
    return await Contact.deleteOne({_id: id});
}

module.exports = {
    findOneContactById, 
    createOneContact,
    findOneContactByIdAndUpdate,
    deleteOneContact
}