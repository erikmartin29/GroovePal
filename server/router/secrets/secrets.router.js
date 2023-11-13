const Authorize = require('../../Middleware/Authorize.js');
const VerifyJWT = require('../../Middleware/VerifyJWT.js');

const secretsRouter = require('koa-router')({
    prefix: '/secrets'
});

secretsRouter.use(VerifyJWT);
secretsRouter.get('/validate/', Authorize(), async (ctx) => {
    ctx.status = 200;
    ctx.body = 'ok';
});

module.exports = secretsRouter;
