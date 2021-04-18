const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const port = process.env.PORT || 4001;
var cors = require('cors')



dotenv.config()

mongoose.connect(
    process.env.DATA_CONNECTED,
    {  useNewUrlParser: true,
        useUnifiedTopology: true }).then(() => console.log("Db connected"))

app.use(express.json())    
app.use(cors()) //cors added

const authRoute = require('./routes/auth');
const domBuilder = require('./routes/domRoute');

app.use('/api/user', authRoute)
app.use('/api/dom', domBuilder)

app.listen(port, () => {
    console.log('server is up and running')
})