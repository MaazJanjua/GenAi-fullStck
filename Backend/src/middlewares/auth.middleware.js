const jwt = require('jsonwebtoken')
const config = require('../config/config')
const tokenBlackListModel = require('../models/blacklist.model')

async function authUser(req, res, next) {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, Please Login to Access this resource/token not found"
        })
    }
    try {
        const decoded = jwt.verify(token, config.JWT_SECRET)
        req.user = decoded
        next()

        const isTokenBlackListed = await tokenBlackListModel.findOne({ token })
        if (!isTokenBlackListed) {
            return res.status(401).json({
                message: 'token is invalid'
            })
        }

    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized, Invalid Token"
        })
    }
}
module.exports = { authUser }