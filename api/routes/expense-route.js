const express  = require('express')
const router = express.Router()
const expenseModel = require('../models/expense')
router.get('/', async(req, res) => {
    try{
        const expenses = await expenseModel.find()
        res.json(expenses)
    }catch(err){
        res.status(400).send({
            message : err
        })
    }
  
})


router.post('/', async(req, res) => {
    if(!req.body.expensetype){
       return res.status(404).send({
            message : 'Expensetype can not be null'
        })
    }
    if(!req.body.title){
      return  res.status(404).send({
            message : 'Title can not be null'
        })
    }
    if(!req.body.amount){
        return  res.status(404).send({
              message : 'Amount can not be null'
          })
      }
    const expenses = new expenseModel({
        expensetype : req.body.expensetype,
        title : req.body.title,
        amount : req.body.amount
    })
    try{
       const data = await expenses.save()
       res.send(data)
    }catch(err){
        
        res.status(400).send({
            message : err
        })
    }
  
})


router.delete('/:id', async(req, res) => {
    
    try{
        if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
            const expenses = await expenseModel.findById(req.params.id)
            if(!expenses){
            
                return res.status(200).send({
                    message : 'Expense not found'
                })
            }
            await expenses.remove()
          
            res.status(200).send({
                message : 'Deleted succssfully!!'
            })
        }else{
            res.status(400).send({
                message : 'Invalid Id'
            })
        }
      
    }catch(err){
      
        res.status(400).send({
            message : err
        })
    }
  
})

router.get('/:id', async(req, res) => {
    
    try{
        if(req.params.id.match(/^[0-9a-fA-F]{24}$/)){
            const expenses = await expenseModel.findById(req.params.id)
            if(!expenses){
            
                return res.status(200).send({
                    message : 'Expense not found'
                })
            }
           
            res.json(expenses)
        }else{
            res.status(400).send({
                message : 'Invalid Id'
            })
        }
      
    }catch(err){
      
        res.status(400).send({
            message : err
        })
    }
  
})

router.put("/:id", async (req, res) => {
	try {
		const expense = await expenseModel.findOne({ _id: req.params.id })
        if(!req.body.expensetype){
            return res.status(404).send({
                 message : 'Expensetype can not be null'
             })
         }
         if(!req.body.title){
           return  res.status(404).send({
                 message : 'Title can not be null'
             })
         }
        if(!req.body.amount){
            return  res.status(404).send({
                message : 'Amount can not be null'
            })
        }
		if (req.body.title) {
			expense.expensetype = req.body.expensetype
		}

		if (req.body.title) {
			expense.title = req.body.title
        }
        if (req.body.amount) {
			expense.amount = req.body.amount
		}

		await expense.save()
		res.send(expense)
	} catch {
        return res.status(404).send({
            message : "Expense doesn't exist!"
        })
		
	}
})
module.exports = router