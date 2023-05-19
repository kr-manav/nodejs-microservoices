const jwt = require('jsonwebtoken')
require('dotenv').config();

const createJwtToken = async (username, email, id) => {
    jwt.sign({
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
const verifyJwtToken = async (token) => {
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err){
            res.status(401).json({
                message: "User not authorized"
            });
        } 
        req.user = decoded.user;
        next();
    })
}
module.exports = {
    createJwtToken, verifyJwtToken
}