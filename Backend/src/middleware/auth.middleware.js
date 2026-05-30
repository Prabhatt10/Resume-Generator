const jwt = require("jsonwebtoken");
const blacklistModel = require('../models/blacklist.model');

async function authUser(req,res,next) {
    const token = req.cookies.token;
    if(!token){
        return res.status(401).json({
            message : "Token ot provided"
        })
    }

    const isTokenBlacklisted = await blacklistModel.findOne({token});

    if(isTokenBlacklisted){
        return res.status(401).json({
            message : "Token is invalid"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error in authMiddleware"
        })
    }
}

module.exports = {authUser}