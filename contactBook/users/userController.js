const asyncHandler = require('express-async-handler')
const { findOneUser, createOneUser } = require('./userServices');
const { hashPassword, verifyPassword } = require('./utils/hashing');
const { createJwtToken } = require('./utils/jwt');
require('dotenv').config();


//@desc Register Users
//@route GET /api/users/register
//@acsess public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        res.status(400).json({
            message: "Not found"
        });;
    }
    const userAvailable = await findOneUser(email);
    if (userAvailable) {
        res.status(400).json({
            message: "Email id registered"
        });
    }

    const hashedPassword = await hashPassword(password);

    const user = await createOneUser(username, email, hashedPassword);

    if (user) {
        res.status(200).json({ id: user.id, email: user.email });
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

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({
            message: "All fields are mandatory"
        });;
    }
    const user = await findOneUser(email);

    if (user && await verifyPassword(password, user.password)) {
        const accessToken = await createJwtToken(user.username,user.email,user.id);
        res.status(200).json({ accessToken })
    } else {
        res.status(400).json({
            message: "Email or Password is not valid"
        });;
    }

})

//@desc Get Current User Info
//@route Get /api/users/current
//@acsess private

const currentUser = asyncHandler(async (req, res) => {
    res.json(req.user)
})


module.exports = { registerUser, loginUser, currentUser }