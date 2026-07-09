const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const app = express();
//middlwera
app.use(express.json())
app.use(cookieParser())
console.log("CLIENT_URL:", process.env.CLIENT_URL);
app.use(cors({
    origin: "https://remarkable-brioche-ea363e.netlify.app/",
    credentials: true,
}));


// require all the routes here
const authRouter = require('./routes/auth.routes');
const interviewRouter = require("./routes/interview.routes")

// using all the routes here
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRouter)


module.exports = app