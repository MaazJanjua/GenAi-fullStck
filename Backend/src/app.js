const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
//middlwera
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    CLIENT_URL: process.env.CLIENT_URL,
    credentials: true
}))


// require all the routes here
const authRouter = require('./routes/auth.routes');
const interviewRouter = require("./routes/interview.routes")

// using all the routes here
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app