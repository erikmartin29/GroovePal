const lastfm_provider = require('../../providers/lastfm.provider');
const SecretsController = require('../../controllers/SecretsController');
const TokenInjector = require('../../Middleware/TokenInjector');
const lastfmRouter = require('koa-router')({
    prefix: '/lastfm'
});

lastfmRouter.get('/auth/:user_id', lastfm_provider.lfm_oauth, err => console.log(err));

lastfmRouter.get('/callback/:user_id/', async (ctx) => {
    lastfm_provider.lfm_callback(ctx)
    .then( data => {
        console.log(data);
        SecretsController.setLastfmSecretKey(data)
            .then( res => {
                console.log(res);
                ctx.status = 200;
            })
            .catch( error => {
                console.log(error);
                ctx.status = 500
            })
    }).catch( error => {
        console.log(error) 
        ctx.status = 500
    });
});

lastfmRouter.post('/scrobble', TokenInjector.lastfm_middleware, lastfm_provider.scrobble); 

module.exports = lastfmRouter;
