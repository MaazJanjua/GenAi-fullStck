const mongoose = require('mongoose')
const config = require('../config/config.js')
async function connectToDb() {
    try {

        await mongoose.connect(config.MONGO_URI)
        console.log('Connected To DB🔥🔥🔥');

    } catch (error) {
        console.log(error);

    }
}
module.exports = connectToDb