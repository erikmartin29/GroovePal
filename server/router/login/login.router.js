const LoginController = require('../../controllers/LoginController');

const loginRouter = require('koa-router')({
    prefix: '/login'
});

loginRouter.get('/:user_id/',LoginController.authorizeUser, (error) => console.log(error));

loginRouter.get('/', (ctx) => {
    ctx.status = 200;
    ctx.body = 'ok';
});

module.exports = loginRouter;
