const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const config = require('./config/dev')
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users')
const bookingRoutes = require('./routes/bookings')


const FakeDb = require('./fake-db')

mongoose.connect(config.DB_URL,{useNewUrlParser:true, useUnifiedTopology: true},function(err){
    if(!err){
        console.log("Connected to Database")
        const fakeDb = new FakeDb()
        //fakeDb.seedDb()
    }else{
        console.log("Database not connected") 
    }
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/api/v1/rentals',rentalRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/bookings',bookingRoutes)

const PORT = process.env.PORT || 3001

app.listen(PORT,function(){
    console.log("App is Running")
})
