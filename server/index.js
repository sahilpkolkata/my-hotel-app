const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const config = require('./config')
const rentalRoutes = require('./routes/rentals');
const userRoutes = require('./routes/users')
const bookingRoutes = require('./routes/bookings')
const path = require('path');

mongoose.Promise = global.Promise
const FakeDb = require('./fake-db')

mongoose.connect(config.MONGO_URL,{useNewUrlParser:true, useUnifiedTopology: true},function(err){
    if(!err){
        console.log("Connected to Database")
        if(process.env.NODE_ENV !== 'production'){
            const fakeDb = new FakeDb()
            //fakeDb.seedDb()
        }
    }else{
        console.log("Database not connected") 
        console.log(err) 
    }
})

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())


app.use('/api/v1/rentals',rentalRoutes)
app.use('/api/v1/users',userRoutes)
app.use('/api/v1/bookings',bookingRoutes)

if(process.env.NODE_ENV === 'production'){
    const appPath = path.join(__dirname, '..', 'dist/my-hotel-app')
    app.use(express.static(appPath))

    app.get('*',function(req,res){
    res.sendFile(path.resolve(appPath,'index.html'))
 })
}
const PORT = process.env.PORT || 3001

app.listen(PORT,function(){
    console.log("App is Running")
})
