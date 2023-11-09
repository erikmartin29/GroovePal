// this middleare provides valid oauth credentials based on the user_id of the
// request body to api enpoints that make requests to 
// lastfm and discogs 
const dbConnection = require('../database/mySQLconnect');

async function discogs_middleware (ctx, next) {
    console.log(ctx.request.body);
    // grab user_id from body

    // get credentials database

    // insert token into body for authed external requests
    return next();
}

async function lastfm_middleware (ctx, next) {
    console.log(ctx.request.body);
    // grab user_id from body
    
    // get credentials database

    // insert token into body for authed external requests

    return next();
}

module.exports =  {
    discogs_middleware,
    lastfm_middleware
}
