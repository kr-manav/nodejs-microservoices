const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')
//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({user_id: req.user.id});
    res.status(200).json(contacts);
    res.end();
});

//@desc Add new contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    console.log("Request body is : ", req.body)
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contactObj = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    console.log(contactObj)
    res.status(200).json(contactObj);
    res.end();
})

//@desc Get contact
//@route PUT /api/contacts
//@access private

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No such contact");
    }
    console.log(contact.user_id.toString(), req.user.id)
    if (contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user don't have permission to update other user's contacts");
    }
    const updated = await Contact.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json(updated);
    // res.end();
})

//@desc Delete contacts
//@route DELETE /api/contacts
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("No such contact");
    }
    if (contact.user_id.toString() !== req.user.id){
        res.status(403)
        throw new Error("user don't have permission to delete other user's contacts");
    } 
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
    res.end();
})

module.exports = { getContact, createContact, updateContact, deleteContact }