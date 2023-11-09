const discogs_provider = require('../../providers/discogs.provider');
const secretsController = require('../../controllers/SecretsController');
const discogsRouter = require('koa-router')({
    prefix: '/discogs'
});

discogsRouter.get('/auth/:user_id', discogs_provider.discogs_oath , err => console.log(err));

discogsRouter.get('/callback/:user_id/', async (ctx) => {
    discogs_provider.discogs_callback(ctx)
    .then( secrets => {
        console.log('secrets', secrets);
        secretsController.storeDiscogsSecretKey(secrets)
            .then( results => {
                console.log(results);
                ctx.body = 'success!';
                ctx.status = 200;
            })
            .catch( error => {
                console.log(error);
                ctx.body = 'OOPS! Something went wrong?';
                ctx.status = 204;
            });
    })
    .catch( error => {
        console.log(error);
        ctx.status = 204;
        ctx.body = 'error getting token';
    })
});

module.exports = discogsRouter
