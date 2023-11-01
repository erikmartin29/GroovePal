const DiscogsController = require('../../controllers/DiscogsController');

const discogsRouter = require('koa-router')({
    prefix: '/discogs'
});

discogsRouter.get('/collection-info/:user', DiscogsController.getCollection, (error) => console.log(error));

module.exports = discogsRouter;

