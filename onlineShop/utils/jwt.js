const jwt = require('jsonwebtoken')
require('dotenv').config();

const createJwtToken = (name, email, id) => {
    return jwt.sign({
        customer: {
            name: name,
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