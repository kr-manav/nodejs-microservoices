const asyncHandler = require('express-async-handler');
const { deleteOneCustomer, findOneCustomerById, findOneCustomerByIdAndUpdate, findOneCustomerByEmail, createOneCustomer } = require('../services/customerServices');
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
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Email id registered"
        });
        return
    }

    const hashedPassword = await hashPassword(password);

    const customer = await createOneCustomer(name, email, phone, address, hashedPassword);

    if (customer) {
        res.setHeader('Content-type', 'text/json').status(200).json({ id: customer._id, email: customer.email });
    } else {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Data not valid"
        });
    }
    res.end();

});

//@desc Users Login
//@route POST /api/users/login
//@acsess public

const loginCustomer = asyncHandler(async (req, res) => {
    console.log("Request body is : ", req.body)
    const { email, password } = req.body;
    if (!email || !password) {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "All fields are mandatory"
        });
    }
    const customer = await findOneCustomerByEmail(email);

    if (customer && await verifyPassword(password, customer.password)) {
        const accessToken = createJwtToken(customer.name, customer.email, customer._id);
        res.setHeader('Content-type', 'text/json').status(200).json({ accessToken })
    } else {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Email or Password is not valid"
        });
    }

})

//@desc Users Edit
//@route PUT /api/customers/edit
//@acsess public

const editCustomer = asyncHandler(async (req, res) => {
    const customer = await findOneCustomerById({ _id: req.params.id });

    if (customer) {
        console.log("🚀 ~ file: customerController.js:75 ~ editCustomer ~ customer:", customer)
        const { name, email, phone, address, password } = req.body;
        if (!name || !email || !password || !phone || !address) {
            res.status(400).json({
                message: "Not found"
            });
        }
        if(customer._id.toString() == req.customer.id){
            const updated = await findOneCustomerByIdAndUpdate(req.params.id, req.body)
            res.setHeader('Content-type', 'text/json').status(200).json(updated);    
        } else {
            res.setHeader('Content-type', 'text/json').status(400).json({
                message: "Not valid customer"
            });
        }
    } else {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Email or Password is not valid"
        });
    }

})

//@desc Users Delete
//@route DELETE /api/customers/delete
//@acsess public

const deleteCustomer = asyncHandler(async (req, res) => {
    const customer = await findOneCustomerById(req.params.id);

    if (customer && customer._id.toString() == req.customer.id) {
        await deleteOneCustomer(req.params.id);
        res.setHeader('Content-type', 'text/json').status(200).json(customer);;
    } else {
        res.setHeader('Content-type', 'text/json').status(400).json({
            message: "Customer Not Found"
        });;
    }

})

//@desc Get Current User Info
//@route Get /api/users/current
//@acsess private

const currentUser = asyncHandler(async (req, res) => {
    res.setHeader('Content-type', 'text/json').json(req.customer)
})


module.exports = { registerCustomer, loginCustomer, currentUser, editCustomer, deleteCustomer }