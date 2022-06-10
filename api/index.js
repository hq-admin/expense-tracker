const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
var cors = require('cors')

const expenseRoute = require('./routes/expense')
const incomeRoute = require('./routes/income')
const transactionRoute = require('./routes/transactions')

const app = express()

app.use(express.json());
app.use(cors())

app.get('/', (req,res)=> {
    res.send("success")
})

mongoose.connect(process.env.MONGO_URL)
.then(()=> console.log("DB connection successfull"))
.catch((err) => console.log(err))

app.use("/api/expenses", expenseRoute)
app.use("/api/incomes", incomeRoute)
app.use("/api/transactions", transactionRoute)

app.listen(5000, ()=> console.log(`Server running successfully`))