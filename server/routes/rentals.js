const express = require('express')
const router = express.Router()
const Rental = require('../models/rental')

router.get('',function(req,res){
    Rental.find({})
        .select('-bookings')
        .exec(
            function(err,foundRentals){
        
                res.json(foundRentals)
            })
})
 
router.get('/:id',function(req,res){
    const rentalId = req.params.id;
    Rental.findById(rentalId)
          .populate('user','username -_id')
          .populate('bookings','startAt endAt -_id')
          .exec(function(err,foundRental){

            if(err){
                return res.status(422).send({errors:[{title:"Rental Error", detail:"Could not find Rental!!"}]})
    
            }
            return res.json(foundRental)
        })
})
module.exports = router