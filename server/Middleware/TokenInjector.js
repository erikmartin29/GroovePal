// this middleare provides valid oauth credentials based on the user_id of the
// request body to api enpoints that make requests to 
// lastfm and discogs 
const SecretsController = require('../controllers/SecretsController');

async function discogs_middleware (ctx, next) {
    const { user_id } = ctx.request.params;
    if ( user_id !== undefined ) {
        // get credentials database
        SecretsController({ user_id })
            .then( creds => {
                // insert token into body for authed external requests
                ctx.request.body = {
                    ...ctx.request.body,
                    credentials: creds,
                };
                return next(); // continue to data route
            })
            .catch( error => {
                console.log(`Error: ${error}`);
                ctx.status = 500; 
                ctx.body = error; // forward error to the client
            })
    }
    // internal server error -> don't continue to data endpoint
    ctx.status = 500; 
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
