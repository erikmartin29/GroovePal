const discogs_provider = require('../../providers/discogs.provider');
const secretsController = require('../../controllers/SecretsController');
const discogsRouter = require('koa-router')({
    prefix: '/discogs'
});


discogsRouter.get('/auth', discogs_provider.discogs_oath , err => console.log(err));

discogsRouter.get('/callback', async (ctx) => {
    discogs_provider.discogs_callback(ctx)
    .then( tokens => {
        console.log(tokens);
        // write token to database, status and body are handled in controller
        secretsController.storeSecretKey(ctx);
    })
    .catch( error => {
        console.log(error);
        ctx.status = 204;
        ctx.body = 'error getting token';
    })
}, err => console.log(err));

module.exports = discogsRouter
