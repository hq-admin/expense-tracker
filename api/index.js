const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
var cors = require('cors')
const path = require('path');
const port = process.env.PORT || 5000

const transactionRoute = require('./routes/transactions')
const categoryRoute = require('./routes/category')

const app = express()

app.use(express.json());
app.use(cors())

app.get('/', (req,res)=> {
    res.send("success")
})

app.use(express.static(path.resolve(__dirname, '../client/build')));

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB connection successfull"))
.catch((err) => console.log(err))

app.use("/api/transactions", transactionRoute)
app.use("/api/categories", categoryRoute)

app.listen(port, ()=> console.log(`Server running successfully`))