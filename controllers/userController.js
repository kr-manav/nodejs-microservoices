const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('dotenv').config();

//@desc Register Users
//@route GET /api/users/register
//@acsess public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("Not found")
    }
    const userAvailable = await User.findOne({ email: email });
    if (userAvailable) {
        res.status(400);
        throw new Error("Email id registered")
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await User.create({
        username: username,
        email: email,
        password: hashedPassword
    })

    if(user){
        res.status(200).json({id:user.id, email: user.email});
    } else {
        res.status(400);
        throw new Error("Data not valid")
    }
    res.end();

});

//@desc Users Login
//@route POST /api/users/login
//@acsess public

const loginUser = asyncHandler(async (req, res) => {
    console.log("Request body is : ", req.body)
    const {email, password} = req.body;
    if (!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user = await User.findOne({email: email})
    
    if(user && await bcrypt.compare(password, user.password)){
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, 
        process.env.ACCESS_TOKEN,
        { expiresIn: "20m" }
        );
        res.status(200).json({ accessToken })
    } else {
        res.status(400);
        throw new Error("Email or Password is not valid");
    }
   
})

//@desc Get Current User Info
//@route PUT /api/users/current
//@acsess private

const currentUser = asyncHandler(async (req, res) => {

    // const contact = await Contact.findById(req.params.id);
    // if(!contact){
    //     res.status(404);
    //     throw new Error("No such contact");
    // }
    // const updated = await Contact.findByIdAndUpdate(req.params.id, req.body)
    // res.status(200).json(updated);
    // res.end();

    res.json(req.user)
})


module.exports = { registerUser, loginUser, currentUser }