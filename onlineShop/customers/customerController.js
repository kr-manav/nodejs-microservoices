const asyncHandler = require('express-async-handler');
const { deleteOneCustomer, findOneCustomerById, findOneCustomerByIdAndUpdate, findOneCustomerByEmail, createOneCustomer } = require('./customerServices');
const { hashPassword, verifyPassword } = require('../utils/hashing')
const { createJwtToken } = require('../utils/jwt')
require('dotenv').config();

//@desc Register Users
//@route GET /api/customer/register
//@acsess public

const registerCustomer = asyncHandler(async (req, res) => {
    const { name, email, phone, address, password } = req.body;
    if (!name || !email || !password || !phone || !address) {
        res.status(400).json({
            message: "Not found"
        });
    }
    const customerAvailable = await findOneCustomerByEmail(email);

    if (customerAvailable) {
        res.status(400).json({
            message: "Email id registered"
        });
        return
    }

    const hashedPassword = await hashPassword(password);

    const customer = await createOneCustomer(name, email, phone, address, hashedPassword);

    if (customer) {
        res.status(200).json({ id: customer._id, email: customer.email });
    } else {
        res.status(400).json({
            message: "Data not valid"
        });
    }
    res.end();

});

//@desc Users Login
//@route POST /api/users/login
//@acsess public

const loginCustomer = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "All fields are mandatory"
        });
    }
    const customer = await findOneCustomerByEmail(email);
    
    if (customer && await verifyPassword(password, customer.password)) {
        const accessToken = createJwtToken(customer.name, customer.email, customer._id);
        res.status(200).json({ accessToken })
    } else {
        res.status(400).json({
            message: "Email or Password is not valid"
        });
    }

})

//@desc Users Edit
//@route PUT /api/customers/edit
//@acsess private

const editCustomer = asyncHandler(async (req, res) => {
    const customer = await findOneCustomerById({ _id: req.params.id });

    if (customer) {
        const { name, email, phone, address, password } = req.body;
        if (!name || !email || !password || !phone || !address) {
            res.status(400).json({
                message: "Not found"
            });
        }


        if (customer._id.toString() == req.customer.id) {
            const customerAvailable = await findOneCustomerByEmail(email);
            if (email != customerAvailable.email) {
                if (customerAvailable) {
                    res.status(400).json({
                        message: "Email id already present, cannot update email field"
                    });
                    return
                }
            }
            const updated = await findOneCustomerByIdAndUpdate(req.params.id, req.body)
            res.status(200).json(updated);
        } else {
            res.status(400).json({
                message: "Not valid customer"
            });
        }
    } else {
        res.status(400).json({
            message: "No such customer found"
        });
    }

})

//@desc Users Delete
//@route DELETE /api/customers/delete
//@acsess private

const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await findOneCustomerById(req.params.id);

    if (customer && customer._id.toString() == req.customer.id) {
        await deleteOneCustomer(req.params.id);
        res.status(200).json(customer);;
    } else {
        res.status(400).json({
            message: "Customer Not Found"
        });;
    }

})

//@desc Get Current User Info
//@route Get /api/users/current
//@acsess private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.customer)
})


module.exports = { registerCustomer, loginCustomer, currentUser, editCustomer, deleteCustomer }