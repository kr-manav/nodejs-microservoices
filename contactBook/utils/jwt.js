const jwt = require('jsonwebtoken')
require('dotenv').config();

const createJwtToken = (username, email, id) => {
    return jwt.sign({
        user: {
            username: username,
            email: email,
            id: id
        },
    }, 
    process.env.ACCESS_TOKEN,
    { expiresIn: process.env.JWT_EXPIRY_TIME }
    );
}

module.exports = {
    createJwtToken
}