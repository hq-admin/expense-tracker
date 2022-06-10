const Expense = require('../models/Expense')

const router = require('express').Router();

// GET ALL EXPENSES
router.get('/', async(req, res) => {
    const month = req.query.month < 10 ? 0 + req.query.month : req.query.month;
    const year = req.query.year;
    const id = req.query.id
    try {
        if(month && year) {
            const expenses = await Expense.find({
                date: {
                    $gte: `${year}-${month}-01T04:00:00.000Z`,
                    $lt: `${year}-${month}-31T04:00:00.000Z`
                }
            })
            res.status(200).json(expenses)
        } else if(id) {
            const expenses = await Expense.findById(id)
            res.status(200).json(expenses)
        }else {
            const expenses = await Expense.find()
            res.status(200).json(expenses)
        }
  
    } catch(err) {
        res.status(500).json(err)
    }
    
})

//CREATE NEW EXPENSE
router.post('/', async(req, res) => {
    const newExpense = new Expense(req.body)
    try {
        const savedExpense = await newExpense.save()
        res.status(200).json(savedExpense)
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE AN EXPENSE
router.delete('/', async (req, res) => {
    console.log(req.query.id)
    try {
        await Expense.findByIdAndDelete(req.query.id)
        res.status(200).json("Expense has been deleted")
    } catch (err) {
        res.status(500),json(err)
    }
})

router.put('/:id', async(req, res)=> {
    const id = req.params.id
    try{
        const res = await Expense.findByIdAndUpdate(req.params.id, {$set:
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