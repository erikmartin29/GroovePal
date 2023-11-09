var Discogs = require('disconnect').Client;
const ls = require('../utils/local_storage')
const consumer_key = process.env.DISCOGS_KEY;
const consumer_secret = process.env.DISCOGS_SECRET;
const callback_url = 'http://localhost:8282/api/v1/discogs/callback';

// discogs oauth
const discogs_oath = (ctx) => {
    return new Promise( (resolve, reject) => {
        const oAuth = new Discogs().oauth();
        oAuth.getRequestToken(
            consumer_key,
            consumer_secret,
            callback_url + `/${ctx.request.params.user_id}/`,
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
                ls.set(`${ctx.request.params.user_id}_discogs`, requestData);
                return resolve();
            },
        );
    });
} 

// oauth callback: this is what discogs calls to provide re-usable creadentials
function discogs_callback(ctx) {
    return new Promise( async (resolve, reject) => {
        const { user_id } = ctx.request.params;
        const { oauth_verifier } = ctx.request.query;

        const requestData = await ls.get(`${user_id}_discogs`);

        if ( user_id === undefined ) {
            return reject('no user_id provided');
        }
        const oAuth = new Discogs(requestData).oauth();
        oAuth.getAccessToken(
            oauth_verifier,
            (err, accessData) => {
                if ( err ) {
                    return reject(`error from discogs authenticater: ${err}`);
                }
                console.log('success!!!!')
                return resolve({
                    token: accessData.token,
                    token_secret: accessData.tokenSecret,
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
