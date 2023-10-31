//const LastFMController = require('../../controllers/LoginController');

const lastFMRouter = require('koa-router')({
    prefix: '/lastfm'
});

lastFMRouter.get('/token', LastFMToken.getUserToken, (error) => console.log(error));

module.exports = lastFMRouter;

