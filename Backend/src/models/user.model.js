const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: [true, 'username must be unique'],
        required: true
    },
    email: {
        type: String,
        unique: [true, 'Account Already Exist with This email address'],
        required: true
    },
    password: {
        type: String,
        required: true
    }

})

const userModel = mongoose.model("users", userSchema)
module.exports = userModel