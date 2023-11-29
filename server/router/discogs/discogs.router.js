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
discogsRouter.get('/auth/:user_id', discogs_provider.discogs_oath , err => console.log(err));

// external request no jwt is going to be provided?
discogsRouter.get('/callback/:user_id/', async (ctx) => {
    try {
        const secrets = await discogs_provider.discogs_callback(ctx);
        const res = await secretsController.storeDiscogsSecretKey(secrets);
        console.log(res);
        ctx.status = 200;
        ctx.body = `
            <h2>Authentication Complete</h2>
            <br/>
            <p>
            You can close this window.
            </p>
        `;
    } catch (e) {
        console.log(e);
        ctx.status = 500;
        ctx.body = 'unable to complete oauth for discogs';
    }
});

discogsRouter.get('/validate/:user_id', async (ctx) => {
    const { user_id } = ctx.request.params;
    try {
        const creds = await secretsController.getDiscogsSecretKey({ user_id });
        ctx.body = {
            synced: (creds != undefined)
        }
        ctx.status = 200;
    } catch ( e ) {
        console.log(e);
        ctx.status = 500;
    }
});

const discogsDataRouter = require('koa-router')({
    prefix: '/data',
});

discogsDataRouter.use(TokenInjector.discogs_middleware);

// todo utilize local auth middleware
discogsDataRouter.post('/collection-info', DiscogsController.getCollection)
discogsDataRouter.post('/release/:releaseID', DiscogsController.getRelease)
discogsDataRouter.post('/release-image/:releaseID', DiscogsController.getReleaseImage)

// append data api routes
discogsRouter.use(
    discogsDataRouter.routes(),
);

module.exports = discogsRouter
