const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send({hi: 'there'})
})

// dynamically set port from environment variables (for Heroku)
// provide alternate of port 5000 if working in dev environment
const PORT = process.env.PORT || 5000
app.listen(PORT)
