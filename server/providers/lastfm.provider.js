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
                session_user: session.username,
                session_key: session.key,
                user_id: user_id,
            });
        })
    });
}

/*
    * srobbles need to contain artist, track, timestamp
    */
const scrobble = async (ctx) => {
    return new Promise( (resolve, reject) => {
        // create a new session?        
        let sesh = new LastfmAPI({
            'api_key': process.env.LASTFM_API_KEY,
            'secret': process.env.LASTFM_API_SECRET
        });
        sesh.setSessionCredentials(ctx.request.body.credentials.session_user, ctx.request.body.credentials.session_key)

        const scrobble_list = ctx.request.body.scrobble_list;

        const log = async (track_list) => {
            return await Promise.all(track_list.map( (track) => {
                return new Promise((resolve, reject) => {
                    sesh.track.scrobble(track, (err, scrobbles) => {
                        if (err) {
                            reject(err);

                        }
                        resolve(scrobbles);
                    })   
                })         
            }))
        };

        log(scrobble_list).then( scrobbles => {
            ctx.status = 200;
            ctx.body = scrobbles;
        }).catch( error => {
            ctx.status = 201;
            ctx.body = `one or more songs were not scrobbled: ${error}`;
        }).finally( () => resolve());
    });
}

module.exports = {
    lfm_oauth,
    lfm_callback,
    scrobble,
};
