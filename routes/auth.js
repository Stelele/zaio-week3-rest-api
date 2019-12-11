const router = require('express').Router()
const passport = require('passport')

//auth login
router.get('/login', function(req,res,next){
    res.render('login')
})

//auth logout
router.get('/logout', function(req,res,nex){
    req.logOut()
    res.redirect('/')
})

//auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile']
}))

//callback route for google to redirect to
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
    res.redirect('/ninjago')
})

module.exports = router

