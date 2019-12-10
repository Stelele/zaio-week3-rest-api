const router = require('express').Router()

//auth login
router.get('/login', function(req,res,next){
    res.render('login')
})

//auth logout
router.get('/logout', function(req,res,nex){
    res.send('logging out')
})

//auth with google
router.get('/google', function(req,res,next){
    res.send('loging in with google')
})

module.exports = router

