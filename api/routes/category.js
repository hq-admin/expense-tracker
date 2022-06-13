const Category = require("../models/Category")

const router = require('express').Router()

// GET ALL CATEGORY
router.get('/', async(req, res) => {
    try {
            const categories = await Category.find()
            res.status(200).json(categories)

    } catch(err) {
        res.status(500).json(err)
    }
    
})

router.get('/:id', async(req, res) => {
    const id = req.params.id
    try {
            const categories = await Category.findById(id)
            res.status(200).json(categories)

    } catch(err) {
        res.status(500).json(err)
    }
    
})

//CREATE NEW CATEGORY
router.post('/', async(req, res) => {
    const newCategory = new Category(req.body)
    try {
        const savedCategory = await newCategory.save()
        res.status(200).json(savedCategory)
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE A CATEGORY
router.delete('/', async (req, res) => {
    console.log(req.query.id)
    try {
        await Category.findByIdAndDelete(req.query.id)
        res.status(200).json("Category has been deleted")
    } catch (err) {
        res.status(500),json(err)
    }
})

//EDIT A CATEGORY
router.put('/:id', async(req, res)=> {
    const id = req.params.id
    try{
        const res = await Category.findByIdAndUpdate(req.params.id, {$set:
        {
            cat: req.body.cat,
            type: req.body.type,
        }},
        { new: true })
        res.status(200).json(res)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;