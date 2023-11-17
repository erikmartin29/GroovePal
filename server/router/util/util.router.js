const Authorize = require('../../Middleware/Authorize.js');
const VerifyJWT = require('../../Middleware/VerifyJWT.js');

const utilRouter = require('koa-router')({
    prefix: '/validate'
});

utilRouter.use(VerifyJWT);
utilRouter.get('/', Authorize(), async (ctx) => {
    ctx.status = 200;
    ctx.body = 'ok';
});

module.exports = utilRouter;
