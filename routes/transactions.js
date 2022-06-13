const Transaction = require('../models/Transaction')

const router = require('express').Router();

// GET ALL Transaction
router.get('/', async(req, res) => {
    const month = req.query.month < 10 ? 0 + req.query.month : req.query.month;
    const year = req.query.year;
    const id = req.query.id
    try {
        if(month && year) {
            const transaction = await Transaction.find({
                date: {
                    $gte: `${year}-${month}-01T04:00:00.000Z`,
                    $lt: `${year}-${month}-31T04:00:00.000Z`
                }
            })
            res.status(200).json(transaction)
        } else if(id) {
            const transaction = await Transaction.findById(id)
            res.status(200).json(transaction)
        }else {
            const transaction = await Transaction.find()
            res.status(200).json(transaction)
        }
  
    } catch(err) {
        res.status(500).json(err)
    }
    
})

//CREATE NEW Transaction
router.post('/', async(req, res) => {
    const newTransaction = new Transaction(req.body)
    try {
        const savedTransaction = await newTransaction.save()
        res.status(200).json(savedTransaction)
    } catch(err) {
        res.status(500).json(err)
    }
})

//DELETE AN Transaction
router.delete('/', async (req, res) => {
    console.log(req.query.id)
    try {
        await Transaction.findByIdAndDelete(req.query.id)
        res.status(200).json("Transaction has been deleted")
    } catch (err) {
        res.status(500),json(err)
    }
})

router.put('/:id', async(req, res)=> {
    const id = req.params.id
    try{
        const res = await Transaction.findByIdAndUpdate(req.params.id, {$set:
        {
            notes: req.body.notes,
            cat: req.body.cat,
            amount: req.body.amount,
            date: req.body.date,
            type: req.body.type
        }},
        { new: true })
        res.status(200).json(res)
    } catch(err) {
        res.status(500).json(err)
    }
})

module.exports = router;