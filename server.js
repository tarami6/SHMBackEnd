const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const port = process.env.PORT || 3000;

dotenv.config()

mongoose.connect(
    process.env.DATA_CONNECTED,
    {  useNewUrlParser: true,
        useUnifiedTopology: true }).then(() => console.log("Db connected"))

app.use(express.json())    

const authRoute = require('./routes/auth');
const htmlBuilder = require('./routes/htmlBuilder');

app.use('/api/user', authRoute)
app.use('/api/html', htmlBuilder)

app.listen(port, () => {
    console.log('server is up and running')
})