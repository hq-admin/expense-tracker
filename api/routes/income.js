const Income = require('../models/Income')

const router = require('express').Router();

// GET ALL Incomes
router.get('/', async(req, res) => {
    const month = req.query.month < 10 ? 0 + req.query.month : req.query.month;
    const year = req.query.year;
    const id = req.query.id
    try {
        if(month && year) {
            const incomes = await Income.find({
                date: {
                    $gte: `${year}-${month}-01T04:00:00.000Z`,
                    $lt: `${year}-${month}-31T04:00:00.000Z`
                }
            })
            res.status(200).json(incomes)
        } else if(id) {
            const incomes = await Income.findById(id)
            res.status(200).json(incomes)
        }else {
            const incomes = await Income.find()
            res.status(200).json(incomes)
        }
  
    } catch(err) {
        res.status(500).json(err)
    }
    
})

//CREATE NEW Income
router.post('/', async(req, res) => {
    const newIncome = new Income(req.body)
    try {
        const savedIncome = await newIncome.save()
        res.status(200).json(savedIncome)
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE AN Income
router.delete('/', async (req, res) => {
    console.log(req.query.id)
    try {
        await Income.findByIdAndDelete(req.query.id)
        res.status(200).json("Income has been deleted")
    } catch (err) {
        res.status(500),json(err)
    }
})

router.put('/:id', async(req, res)=> {
    const id = req.params.id
    try{
        const res = await Income.findByIdAndUpdate(req.params.id, {$set:
        {
            title: req.body.title,
            cat: req.body.cat,
            amount: req.body.amount,
            date: req.body.date
        }},
        { new: true })
        res.status(200).json(res)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;