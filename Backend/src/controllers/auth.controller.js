const config = require('../config/config')
const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken");
const tokenBlackListModel = require('../models/blacklist.model')

/**
 * @name registerUserController
 * @route POST /api/auth/register
 * @desc Register a new user, expects username, email and password in the request body
 * @access Public
 */
async function registerUserController(req, res) {
    console.log("BODY:", req.body);
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({
            message: "Please Provide Username Email  and Password"
        })
    }
    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    })

    if (isUserAlreadyExist) {
        return res.status(400).json({
            message: "Account Already Exist With This Email Address or Username"
        })
    }

    const hash = await bcrypt.hash(password, 10)
    const user = await userModel.create({
        username,
        email,
        password: hash
    })
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        config.JWT_SECRET,
        { expiresIn: '1d' }
    )
    res.cookie('token', token)
    res.status(201).json({
        message: "User Register successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}

/**
 * @name loginUserController
 * @route POST /api/auth/login
 * @desc Login a user, expects email and password in the request body
 * @access Public
 */
async function loginUserController(req, res) {
    // console.log("BODY:", req.body);
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required"
        })
    }
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "Invalid Email or password"
        })
    }
    //password hashed
    const isPassowrdValid = await bcrypt.compare(password, user.password)
    if (!isPassowrdValid) {
        return res.status(400).json({
            message: "Invalid Exist or password"
        })
    }
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username
        },
        config.JWT_SECRET,
        { expiresIn: "1d" }
    );

    res.cookie("token", token, {
        httpOnly: true,
        secure: true,      // Render + Netlify (HTTPS)
        sameSite: "none",  // Cross-site cookie
        maxAge: 24 * 60 * 60 * 1000
    });

    return res.status(200).json({
        message: "User Logged in Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    });

}

/**
 * @name logoutUserController
 * @route GET /api/auth/logout
 * @desc Clear token from user's cookies and add token to blacklist
 * @access Public
 */
async function logoutUserController(req, res) {

    try {
        const token = req.cookies.token
        if (!token) {
            return res.status(400).json({
                message: "token not received  for blacklist"
            })
        }

        await tokenBlackListModel.create({ token })

        // res.clearCookie('token')

        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        })

        res.status(200).json({
            message: "User Logged Out Successfully"
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }


}

/**
 * @name getMeController
 * @route GET /api/auth/get-me
 * @description get the current logged in user detail
 * @access private
*/
async function getMeController(req, res) {
    const user = await userModel.findById(req.user.id)
    res.status(200).json({
        message: "User Details Fetched Successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}



module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}