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
const utilRouter = require('./util/util.router.js');
const discogsRouter = require('./discogs/discogs.router.js');
const lastfmRouter = require('./lastfm/lastfm.router.js');

router.use(
    loginRouter.routes(),
    utilRouter.routes(),
    discogsRouter.routes(),
    lastfmRouter.routes(),
);

module.exports = (app) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
