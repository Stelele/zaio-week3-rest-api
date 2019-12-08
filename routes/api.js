const express = require('express')
const router = express.Router()
const Ninja = require('../models/ninja')

//get a list of ninjas from the database
router.get('/ninjas', function(req,res,next){
    lng = parseFloat(req.query.lng)
    lat = parseFloat(req.query.lat)
    Ninja.aggregate([{
        $geoNear: {
            near: { type: "Point", coordinates: [ lng , lat ] },
            distanceField: "dist.calculated",
            maxDistance: 100000,
            includeLocs: "dist.location",
            spherical: true
        }
          
    }], function(err, results){
        if(err){ throw err}

        res.send(results)
    }).catch(next)
})

// add a new ninja to the db
router.post('/ninjas', function(req,res,next){
    Ninja.create(req.body).then(function(ninja){
        res.send(ninja)

    }).catch(next)
})

// update a ninja in the db
router.put('/ninjas/:id', function(req,res,next){
    Ninja.findByIdAndUpdate({
        _id: req.params.id

    }, req.body).then(function(){
        Ninja.findOne({_id: req.params.id}).then(function(ninja){
            res.send(ninja)
        })
    }).catch(next)
})

//delete a ninja from the db
router.delete('/ninjas/:id', function(req,res,next){
    Ninja.findByIdAndRemove({
        _id: req.params.id

    }).then(function(ninja){
        res.send(ninja)

    }).catch(next)
})

module.exports = router