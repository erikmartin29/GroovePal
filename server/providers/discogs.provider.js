const disconnect = require('disconnect');
const consumer_key = process.env.DISCOGS_KEY;
const consumer_secret = process.env.DISCOGS_SECRET;
const callback_url = 'http://localhost:8282/api/v1/discogs/callback';
const Discogs = new disconnect.Client();

// discogs oauth
const discogs_oath = (ctx) => {
    return new Promise( (resolve, reject) => {
        const oAuth = new Discogs.oauth();
        oAuth.getRequestToken(
            consumer_key,
            consumer_secret,
            callback_url,
            (err, requestData) => {
                console.log(requestData);
                if ( err ) {
                    console.log(err);
                    return reject();
                }
                ctx.status = 200;
                ctx.body = {
                    authurl: requestData.authorizeUrl,
                }
                return resolve();
            },
        );
    });
} 

function discogs_callback(ctx) {
    return new Promise( (resolve, reject) => {
        const { oauth_token, oauth_verifier } = ctx.request.query;
        if ( oauth_token === undefined || oauth_verifier === undefined ) {
            return reject('unable to get token');
        }
        console.log(oauth_token, oauth_verifier);
        return resolve({
            oauth_token: oauth_token,
            oauth_verifier: oauth_verifier,
        });
    })
}

module.exports = {
    discogs_oath,
    discogs_callback
};
