const discogs_provider = require('../../providers/discogs.provider');
const secretsController = require('../../controllers/SecretsController');
const TokenInjector = require('../../Middleware/TokenInjector');
const VerifyJWT = require('../../Middleware/VerifyJWT');
const Authorize = require('../../Middleware/Authorize');
const DiscogsController = require('../../controllers/DiscogsController');

const discogsRouter = require('koa-router')({
    prefix: '/discogs'
});

// require user to be logged in
discogsRouter.use(VerifyJWT);
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

const discogsDataRouter = require('koa-router')({
    prefix: '/data',
});

discogsDataRouter.use(TokenInjector.discogs_middleware);

discogsDataRouter.post('/collection-info/:user', Authorize(), DiscogsController.getCollection)
discogsDataRouter.post('/release-image/:releaseID', Authorize(), DiscogsController.getReleaseImage)


// append data api routes
discogsRouter.use(
    discogsDataRouter.routes(),
);

module.exports = discogsRouter
