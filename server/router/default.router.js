const Authorize = require('../Middleware/Authorize.js');
const VerifyJWT = require('../Middleware/VerifyJWT.js');

const router = require('koa-router')({
    prefix: '/api/v1/'
});

router.get('/', (ctx) => {
    console.log('base route hit');
    ctx.status = 200;
    ctx.body = 'ok';
});

// import routes
const loginRouter = require('./login/login.router');

router.use(
    loginRouter.routes()
);

module.exports = (app) => {
    app.use(router.routes());
    app.use(router.allowedMethods());
};
