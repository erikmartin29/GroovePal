const discogs_provider = require('../../providers/discogs.provider');
const secretsController = require('../../controllers/SecretsController');
const VerifyJWT = require('../../Middleware/VerifyJWT');
const Authorize = require('../../Middleware/Authorize');

// require user to be logged in
discogsRouter.use(VerifyJWT);

const discogsRouter = require('koa-router')({
    prefix: '/discogs'
});

discogsRouter.get('/auth/:user_id', Authorize(), discogs_provider.discogs_oath , err => console.log(err));

// external request no jwt is going to be provided?
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
