// this middleare provides valid oauth tokens based on the user_id of the
// request body to api enpoints that make requests to 
// lastfm and discogs 
const dbConnection = require('../database/mySQLconnect');

/*
request body should contain the following

body = {
    provider: "discogs" || "lasfm",
    user_id: <user_id>,
}
*/

module.exports = () => {
    return async (ctx, next) => {
        console.log(`user_id: ${ctx.request.body.user_id}, provider: ${ctx.request.body.provider}`);
        // 1. await database query to get token
        // 2. append token to body
        // 3. forward request
        return next();
    }
}
