const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const keys = require("./keys")
const User = require("../models/user")

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) =>{
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    //options for the google strategy
    clientID: keys.gooogle.clientID,
    clientSecret: keys.gooogle.clientSecret,
    callbackURL: '/auth/google/redirect'

    }, (accessToken, refreshToken, profile, done) =>{
        User.findOne({googleID:profile.id}).then((currentUser) => {
            if(currentUser){
                //already have the user
                console.log('user is: '+ currentUser.username)
                done(null, currentUser)

            } else {
                new User({
                    username: profile.displayName,
                    googleID: profile.id
        
                }).save().then((newUser) => {
                    console.log("New user created: "+ newUser.username)
                    done(null, newUser)
                })
            }
        })
        
        
    })
)