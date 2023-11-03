const lastfm_provider = require('../../providers/lastfm.provider');
const SecretsController = require('../../controllers/SecretsController');
const lastfmRouter = require('koa-router')({
    prefix: '/lastfm'
});

lastfmRouter.get('/auth/:user_id', lastfm_provider.lfm_oauth, err => console.log(err));
lastfmRouter.get('/callback/:user_id', async (ctx) => {
    lastfm_provider.lfm_callback(ctx)
    .then( data => {
        console.log(data);
        // write token to database, status and body are handled in controller
        //SecretsController.storeSecretKey(ctx)
        ctx.status = 200;
    });
});

module.exports = lastfmRouter;
