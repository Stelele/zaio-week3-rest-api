const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passportSetup = require("./config/passport-setup")
const cookieSession = require("cookie-session")
const keys = require('./config/keys')
const passport = require("passport")

//set up express app
const app = express()

//set up view engine
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use('/public',express.static('public'))

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}))


//connect to mongodb
mongoose.connect(keys.mongodb.dbURI, (err) =>{
    if(err) throw err
    console.log("Connected to Mongodb")
})
mongoose.Promise = global.Promise


app.use(bodyParser.json())

//initialize passport
app.use(passport.initialize())
app.use(passport.session())

//initialize routes
app.use('/auth', require('./routes/auth'))
app.use('/api', require('./routes/api'))
app.use('/', require('./routes/ninjago'))
app.use('/ninjago', require('./routes/ninjago'))

//error handing middle ware
app.use(function(err,req,res,next){
    //console.log(err)
    res.status(422).send({error: err.message})
})

//listen for request
app.listen(process.env.PORT || 4000,function(){
    console.log('now listening for requests')

})


