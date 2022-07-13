const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req) => {
    try{
        console.log(req.headers.authorization);
        const token = req.headers.authorization.split(' ')[1];
        const checkToken = jwt.verify(token, process.env.JWT_SECRET);
        return checkToken;
    }catch(error){
        console.log(`Error verifying token: ${error}`);
        return null;
    }
}