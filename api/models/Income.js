const mongoose = require('mongoose')

const IncomeSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, unique: false},
        cat: { type: String, required: true},
        amount: { type: Number, required: true },
        date: {type: String, required: true}
    }, {timestamps: true}
)
module.exports = mongoose.model("Income", IncomeSchema)