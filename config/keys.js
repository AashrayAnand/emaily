// keys.js, figure out whether to use dev or prod 
if(process.env.NODE_ENV === 'production'){
    // in production
    module.exports = require('./prod')
} else {
    // we are in development, return dev keys
    module.exports = require('./dev')
}