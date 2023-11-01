const discogs_provider = require('../../providers/discogs.provider');
const discogsDatabaseRouter = require('koa-router')({
    prefix: '/database'
});

discogsDatabaseRouter.get('/get-release/:id', discogs_provider.getReleaseByID);

module.exports = discogsDatabaseRouter
