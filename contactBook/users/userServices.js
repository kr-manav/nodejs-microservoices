const User = require('./userModel')
require('dotenv').config();

const findOneUser = async (email) => {
    return await User.findOne({ email: email });
}

const createOneUser = async (username, email, password) => {
    return await User.create({
        username: username,
        email: email,
        password: password
    })
}

module.exports = {
    findOneUser, createOneUser
}