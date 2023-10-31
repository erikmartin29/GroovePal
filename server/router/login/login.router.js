const LoginController = require('../../controllers/LoginController');
const HashPassword = require('../../Middleware/passwordHash');

const loginRouter = require('koa-router')({
    prefix: '/login'
});

loginRouter.post('/',LoginController.authorizeUser, (error) => console.log(error));
loginRouter.post('/new_user/', HashPassword() , LoginController.createUser, (error) => console.log(error));

module.exports = loginRouter;
