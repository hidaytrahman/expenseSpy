const express = require('express')
const mongoose = require('mongoose')
const app = express()
const uri = "mongodb+srv://expensespyuser:e7nrDjRKr294q09H@expensespy.y71ii.mongodb.net/expensespydb?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser:true,useUnifiedTopology:true})
const con  =  mongoose.connection
con.on('open', ()=>{
    console.log("connected")
})
app.use(express.json())
const expensesRouter = require('./routes/expense-route')
app.use('/expenses', expensesRouter)
app.listen(9000, () => {
    console.log('listening...')
})