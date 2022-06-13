const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
var cors = require('cors')

const transactionRoute = require('./routes/transactions')
const categoryRoute = require('./routes/category')

const app = express()

app.use(express.json());
app.use(cors())

app.get('/', (req,res)=> {
    res.send("success")
})

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB connection successfull"))
.catch((err) => console.log(err))

app.use("/api/transactions", transactionRoute)
app.use("/api/categories", categoryRoute)

app.listen(5000, ()=> console.log(`Server running successfully`))