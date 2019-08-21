const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const config = require('./config/dev')
const Rental = require('./models/rental')
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users')


const FakeDb = require('./fake-db')

mongoose.connect(config.DB_URL,{useNewUrlParser:true},function(err){
    if(!err){
        console.log("Connected to Database")
        const fakeDb = new FakeDb()
        //fakeDb.seedDb()
    }
})

app.use(bodyParser.json())
//app.use(bodyParser.urlencoded({extended:false}))

app.use('/api/v1/rentals',rentalRoutes)
app.use('/api/v1/users',userRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT,function(){
    console.log("App is Running")
})
