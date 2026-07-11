//ISS MIAN BLACKLISTED KS LOGIN GLAT HA CHECK GLAT HA 
const jwt = require('jsonwebtoken')
const config = require('../config/config')
const tokenBlackListModel = require('../models/blacklist.model')

async function authUser(req, res, next) {
    console.log("Cookies:", req.cookies);
    console.log("Token:", req.cookies.token);
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, Please Login to Access this resource/Token not found"
        })
    }
    try {
        // ✅ 1. Check blacklist FIRST
        const isTokenBlackListed = await tokenBlackListModel.findOne({ token })

        if (isTokenBlackListed) {
            return res.status(401).json({
                message: 'Token is blacklisted'
            })
        }

        // ✅ 2. Verify token
        const decoded = jwt.verify(token, config.JWT_SECRET)
        req.user = decoded

        // ✅ 3. NEXT at the END
        next()



    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized, Invalid Token"
        })
    }
}
module.exports = { authUser }