const lastfm_provider = require('../../providers/lastfm.provider');
const SecretsController = require('../../controllers/SecretsController');
const ScrobblesController = require('../../controllers/ScrobbleController');
const TokenInjector = require('../../Middleware/TokenInjector');
const lastfmRouter = require('koa-router')({
    prefix: '/lastfm'
});

lastfmRouter.get('/auth/:user_id', lastfm_provider.lfm_oauth, err => console.log(err));

lastfmRouter.get('/callback/:user_id/', async (ctx) => {
    try {
        const credentials = await lastfm_provider.lfm_callback(ctx);
        const res = await SecretsController.setLastfmSecretKey(credentials)
        console.log(res);
        ctx.status = 200;
        ctx.body = `
            <h2>Authentication Complete</h2>
            <br/>
            <p>
            You can close this window.
            </p>
        `;
        console.log(ctx.status);
    } catch (e) {
        ctx.body = 'internal server error';
        ctx.status = 500;
    }
});

lastfmRouter.post('/scrobble', TokenInjector.lastfm_middleware, lastfm_provider.scrobble); 

lastfmRouter.get('/get-scrobbles/:user_id', async (ctx) => {
    const { user_id } = ctx.request.params;
    // todo query parameters for filtering
   //const { count_artists, count_album };
    try {
        const scrobbles = await ScrobblesController.getScrobblesByUser(user_id);
        ctx.body = scrobbles;
        ctx.status = 200;
    } catch(e) {
        console.log(e);
    }
})

module.exports = lastfmRouter;
