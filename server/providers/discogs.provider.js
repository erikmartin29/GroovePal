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
            callback_url + `/${ctx.request.params.user_id}`,
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
        const { user_id } = ctx.request.params;
        if ( oauth_token === undefined || oauth_verifier === undefined ) {
            return reject('unable to get token');
        }
        if ( user_id === undefined ) {
            return reject('no user_id provided');
        }
        console.log(oauth_token, oauth_verifier);
        const oAuth = new Discogs.oauth();
        oAuth.getAccessToken(
            oauth_verifier,
            (err, accessData) => {
                if ( err ) {
                    console.log(err);
                    return reject(`error authenticating with discogs`);
                }
                console.log()
                return resolve({
                    oauth_verifier: oauth_verifier,
                    access_data: accessData,
                    user_id: user_id,
                });
            }
        )
    })
}

module.exports = {
    discogs_oath,
    discogs_callback
};
