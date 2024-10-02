import { JWT_SECRET } from "./config";
const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next){
    const authHeader = req.headers.authorization;
    if(!token.startsWith('Bearer')){
        res.status(411).json({
            message: "Unauthorized"
        })
    }

    const token = authHeader.split(' ')[1];
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch(err){
        return res.status(403).json({
            message: "Forbidden"
        })
    }

    module.exports = authMiddleware;
}