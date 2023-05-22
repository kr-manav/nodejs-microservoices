const asyncHandler = require('express-async-handler');
// const { verifyJwtToken } = require('../utils/jwt');
require('dotenv').config();
const jwt = require('jsonwebtoken')


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if(err){
                throw new Error("User not authorized");
            } 
    
            req.customer =  decoded.customer;
        });
        next();
        if(!token){
            res.status(401).json({
                message: 'User not authorized or token is missing'
            });
        }
    }

});

module.exports = { validateToken }
