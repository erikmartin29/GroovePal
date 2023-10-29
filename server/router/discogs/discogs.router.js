const discogs_provider = require('../../providers/discogs.provider');

const discogsRouter = require('koa-router')({
    prefix: '/discogs'
});

discogsRouter.get('/', (ctx) => {

    ctx.status = 200;
});

module.exports = discogsRouter
