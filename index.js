const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')

// enable cookies
app.use(
    cookieSession({
        // 30 days max age in ms
        maxAge : 30 * 24 * 60 * 60 * 1000,
        // randomly generated cookieKey
        keys : [keys.cookieKey]
    })
)

app.use(passport.initialize())
app.use(passport.session())
// require mongoose user schema
require('./models/users')
// require passport.js configuration
require('./services/passport')
// connect mongoose to remotely hosted MongoDB
mongoose.connect(keys.mongoURI)
// in auth_routes, we export two functions, given an express
// app object, auth_routs wraps 2 get route handlers to the given
// express object, the below line therefore adds these route handlers
// to 'app'
require('./routes/auth_routes')(app)

// dynamically set port from environment variables (for Heroku)
// provide alternate of port 5000 if working in dev environment
const PORT = process.env.PORT || 5000
app.listen(PORT)
