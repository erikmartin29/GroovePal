const LastfmAPI = require('lastfmapi');

const callback_url = 'http://localhost:8282/api/v1/lastfm/callback';
const client = new LastfmAPI({
    'api_key': process.env.LASTFM_API_KEY,
    'secret': process.env.LASTFM_API_SECRET
});

const lfm_oauth = (ctx) => {
    return new Promise( (resolve, reject) => {
        try {
            const authUrl = client.getAuthenticationUrl({ 'cb': callback_url + `/${ctx.request.params.user_id}/`});
            ctx.status = 200;
            ctx.body = {
                authurl: authUrl,
            };
            return resolve();
        } catch (e) {
            ctx.status = 204;
            console.log(e);
            return reject();
        }
    });
}

const lfm_callback = (ctx) => {
    return new Promise( (resolve, reject) => {
        console.log(ctx.request);
        const { token } = ctx.request.query;
        const { user_id } = ctx.request.params
        console.log('user_id:', user_id);
        console.log('auth_token:', token);
        client.authenticate(token, (error, session) => {
            if ( error ) 
                return reject(`error in lastfm authenticator: ${JSON.stringify(error)}`)
            console.log(session.username, session.key);
            resolve({
                username: session.username,
                key: session.key,
                local_user: user_id,
            });
        })
    });
}

const scrobble = (ctx) => {
    return new Promise( (resolve, reject) => {
        // create a new session?        
    });
}

module.exports = {
    lfm_oauth,
    lfm_callback,
};
