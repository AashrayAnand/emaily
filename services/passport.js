const passport = require('passport')
const GoogleOAuth = require('passport-google-oauth20')
const keys = require('../config/keys')
const mongoose = require('mongoose')

// get access to user mongoose model class
const User = mongoose.model('users')

// serializeUser function, used to convert User instance to a unique cookie
// the result of serializeUser is stored in req.session.passport.user = {}
passport.serializeUser((user, done) => {
    // serializeUser takes a User isntance, and the
    // done argument

    // pass null for error object to done callback, and ID,
    // for follow up requests, which is the user id generated
    // automatically by mongoDB for every record in the users collection
    done(null, user.id)

})

// given an ID from a cookie, find the user that matches this ID,
// and return the user profile
passport.deserializeUser((userId, done) => {
    User.findById(userId).then(user => {
        done(null, user)
    })
})


// pass strategy configuration to passport, tells passport to
// authenticate using google OAuth strategy
passport.use(new GoogleOAuth({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback',
    proxy: true
    }, (accessToken, refreshToken, profile, done) => {
            console.log('access token ', accessToken)
            console.log('refresh token ', refreshToken)
            console.log('profile: ', profile)
            // check if user has signed up before, before adding new record
            User.findOne({ googleID : profile.id }).then(existingUser => {
                if(existingUser){      
                    // return new user, if no existing user exists
                    done(null, existingUser)
                } else {
                    // return existing user, if exists
                    new User({googleID : profile.id}).save().then(user => done(null, user))
                }
            })
        }
    )
)