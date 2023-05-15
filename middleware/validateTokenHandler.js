const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken')
require('dotenv').config();

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
    if(authHeader && authHeader.startsWith('Bearer')){
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
            if(err){
                res.status(401);
                throw new Error("User not authorized");
            } 
            req.user = decoded.user;
            console.log("Decoded user",decoded.user);
            next();
        })

        if(!token){
            res.status(401);
            throw new Error('User not authorized or token is missing');
        }
    }

});

module.exports = { validateToken }
