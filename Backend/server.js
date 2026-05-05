require('dotenv').config()
const app = require('./src/app')

const connectDB = require('./src/config/database')


// const invokeGeminiAi = require('./src/services/ai.service')

connectDB();
// invokeGeminiAi();
app.get('/', (req, res) => {
    res.send('Home Page');
});
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
