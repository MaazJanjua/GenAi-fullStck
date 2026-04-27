// const dotenv = require('dotenv')
// dotenv.config();
if (!process.env.MONGO_URI) {
    // console.log("MONGO_URL:", process.env.MONGO_URL);
    throw new Error("MONGO_URI is not defined in environment variables")
}
if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined in environment variables')
}
const config = {
    MONGO_URI: process.env.MONGO_URI,
    JWT_SECRET: process.env.JWT_SECRET,
    GENAI_KEY: process.env.GOOGLE_GENAI_API_KEY
}
module.exports = config;