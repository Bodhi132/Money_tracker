const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app=express()
const Transaction = require('./models/Transaction.js')
require('dotenv').config()
mongoose.set('strictQuery', false)

app.use(cors())
app.use(express.json())

app.get('/api/test',(req,res)=>{
    res.json('test ok')
})

app.post('/api/transaction',async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const{name,description,datetime,price}=req.body
    const transaction = await Transaction.create({name,price,description,datetime})
    res.json(transaction)
})

app.get('/api/transaction',async(req,res)=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    const transaction = await Transaction.find()
    res.json(transaction)

})

app.listen(4040)