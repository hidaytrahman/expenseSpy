const mongoose = require('mongoose')
const { Decimal128 } = require('mongodb')
const expenseSchema  =  new mongoose.Schema({
    expensetype: {
        type : String,
        required : true
    },
    title:{
        type : String,
        required : true
    },
    amount : {
        type : Decimal128,
        required : true
    },
    createdAt : {
        type : Date,
        default : Date.now
    }

})

module.exports = mongoose.model('expenseModel', expenseSchema)