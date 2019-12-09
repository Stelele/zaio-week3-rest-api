const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//set up express app
const app = express()

//connect to mongodb
mongoose.connect("mongodb+srv://test:test@todo-9zzzh.mongodb.net/test?retryWrites=true&w=majority")
mongoose.Promise = global.Promise

app.use(express.static('public'))
app.use(bodyParser.json())

//initialize routes
app.use('/api', require('./routes/api'))

//error handing middle ware
app.use(function(err,req,res,next){
    //console.log(err)
    res.status(422).send({error: err.message})
})

//listen for request
app.listen(process.env.PORT || 4000,function(){
    console.log('now listening for requests')

})


