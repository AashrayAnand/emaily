const passport = require('passport')

module.exports = app => {

    app.get('/', (req, res) => {
        res.send({'hi' : 'there'})
    })
    // route handler for sending user through authentication flow
    app.get('/auth/google', passport.authenticate('google', {
                // specifies access to profile information of 
                // user that we ask for, email + profile in this case
                scope: ['profile', 'email']
            }
        )
    )

    // route handler for handling user redirect from authentication
    // passport can take code from authorization callback, and handle
    // the process of resolving profile information with the given code
    app.get('/auth/google/callback', passport.authenticate('google'))

    // attach the user 
    app.get('/api/current_user', (req, res) => {
        res.send(req.user)
    })

    // route handler attached to 
    app.get('/api/logout', (req, res) => {
        // removes user cookie
        req.logout()
        res.send(req.user)
    })
}

