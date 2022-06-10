const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema(
    {
        notes: { type: String, required: true, unique: false},
        cat: { type: String, required: true},
        amount: { type: Number, required: true },
        date: {type: String, required: true},
        type: {type: String, required: true}
    }, {timestamps: true}
)
module.exports = mongoose.model("Transactions", TransactionSchema)