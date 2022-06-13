const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
    {
        cat: { type: String, required: true},
        type: {type: String, required: true}
    }, {timestamps: true}
)
module.exports = mongoose.model("Category", CategorySchema)