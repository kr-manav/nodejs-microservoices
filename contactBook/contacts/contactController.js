const asyncHandler = require('express-async-handler');
const { findOneContactById, createOneContact, findOneContactByIdAndUpdate, deleteOneContact } = require('./contactServices');

//@desc Get all contacts
//@route GET /api/contacts
//@access private

const getContact = asyncHandler(async (req, res) => {
    try {
        const contacts = await findOneContactById(req.params.id);
        res.status(200).json(contacts);
    } catch (e) {
        console.log("🚀 ~ file: contactController.js:10 ~ getContact ~ e:", e)
    }
});

//@desc Add new contact
//@route POST /api/contacts
//@access private

const createContact = asyncHandler(async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        console.log("🚀 ~ file: contactController.js:19 ~ createContact ~ req.body:", req.body)
        if (!name || !email || !phone) {
            res.status(400).json({
                message: "All fields are mandatory"
            });
        }
        const contactObj = await createOneContact(name, email, phone, req.user.id);
        res.status(200).json(contactObj);
    } catch (e) {
        console.log("🚀 ~ file: contactController.js:10 ~ getContact ~ e:", e)
    }
})

//@desc Get contact
//@route PUT /api/contacts
//@access private

const updateContact = asyncHandler(async (req, res) => {
    try {
        const contact = await findOneContactById(req.params.id);
        if (!contact) {
            res.status(400).json({
                message: "No such contact"
            });
        }

        if (contact.user_id.toString() !== req.user.id) {
            res.status(400).json({
                message: "user don't have permission to delete other user's contacts"
            })
        }
        const updated = await findOneContactByIdAndUpdate(req.params.id, req.body)
        res.status(200).json(updated);
    } catch (e) {
        console.log("🚀 ~ file: contactController.js:10 ~ getContact ~ e:", e)
    }
})

//@desc Delete contacts
//@route DELETE /api/contacts
//@access private

const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await findOneContactById(req.params.id);
        if (!contact) {
            res.status(404);
            throw new Error("No such contact");
        }
        if (contact.user_id.toString() !== req.user.id) {
            res.status(400).json({
                message: "user don't have permission to delete other user's contacts"
            })
        }
        await deleteOneContact(req.params.id);
        res.status(200).json(contact);
    } catch (e) {
        console.log("🚀 ~ file: contactController.js:10 ~ getContact ~ e:", e)
    }
})

module.exports = { getContact, createContact, updateContact, deleteContact }