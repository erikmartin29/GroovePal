const router = require('koa-router')({
    prefix: '/api/v1'
});

router.get('/', (ctx) => {
    console.log('base route hit');
    ctx.status = 200;
    ctx.body = 'ok';
});

// import routes
const loginRouter = require('./login/login.router.js');
const secretsRouter = require('./secrets/secrets.router.js');
const discogsRouter = require('./discogs/discogs.router.js');

router.use(
    loginRouter.routes(),
    secretsRouter.routes(),
    discogsRouter.routes()
);

module.exports = (app) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
