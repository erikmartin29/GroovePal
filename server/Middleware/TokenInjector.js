// this middleare provides valid oauth credentials based on the user_id of the
// request body to api enpoints that make requests to 
// lastfm and discogs 
const SecretsController = require('../controllers/SecretsController');
const consumer_key = process.env.DISCOGS_KEY;
const consumer_secret = process.env.DISCOGS_SECRET;
// todo: 
//  rewrite as single middleware: check path to determine which
//  service is being authenticated        

async function discogs_middleware (ctx, next) {
    const { user_id } = ctx.request.body;
    console.log('discogs middleware hit');
    if ( user_id !== undefined ) {
        // get credentials database
        try {
            const creds = await SecretsController.getDiscogsSecretKey({ user_id });
            // insert token into body for authed external requests
            ctx.request.body = {
                ...ctx.request.body,
                credentials: {
                    method: 'oauth',
                    level: 2,
                    consumerKey: consumer_key,
                    consumerSecret: consumer_secret,
                    token: creds.token,
                    tokenSecret: creds.token_secret,
                    authorizeUrl: `https://www.discogs.com/oauth/authorize?oauth_token=${creds.token}`
                },
            };
            console.log('discogs credentials retrived');
        } catch (error) {
            console.log(`Error: ${error}`);
            ctx.status = 500; 
            ctx.body = error; // forward error to the client
            return; // Don't continue to the next middleware
        }
    } else {
        // internal server error -> don't continue to data endpoint
        ctx.body = 'no user id provided';
        ctx.status = 500; 
        return; // Don't continue to the next middleware
    }
    await next(); // continue to data route
    console.log(`status: ${ctx.status}`)
}

async function lastfm_middleware (ctx, next) {
    const { user_id } = ctx.request.params;
    if ( user_id !== undefined ) {
        // get credentials from database
        try {
            const creds = await SecretsController.getLastfmSecretKey({user_id})
            console.log(creds);
            // insert in to request body
            ctx.request.body = {
                ...ctx.request.body,
                credentials: {
                    session_user: creds.session_user,
                    session_key: creds.session_key,
                }
            };
            console.log('lastfm credentials retrived');
        } catch (error) {
            console.log(`Error: ${error}`);
            ctx.status = 500;
            ctx.body = error;
            return; // don't continue to next middleware
        }
    } else {
        ctx.body = 'no user id provided';
        ctx.status = 500;
        return;

    }
    await next();
    console.log(`status: ${ctx.status}`);
}

module.exports =  {
    discogs_middleware,
    lastfm_middleware
}
