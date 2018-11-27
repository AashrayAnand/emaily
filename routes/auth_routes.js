const passport = require('passport')

module.exports = app => {
    // route handler for sending user through authentication flow
    app.get('/auth/google', passport.authenticate('google', {
                // specifies access to profile information of 
                // user that we ask for, email + prpfile in this case
                scope: ['profile', 'email']
            }
        )
    )

    // route handler for handling user redirect from authentication
    // passport can take code from authorization callback, and handle
    // the process of resolving profile information with the given code
    app.get('/auth/google/callback', passport.authenticate('google'))
}

