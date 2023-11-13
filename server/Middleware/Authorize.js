const setAccessToken = require('../utils/setAccessToken');

module.exports = () => {
    return async (ctx, next) => {
        console.log('In Authorize. ctx.state = ', ctx.state);
        console.log('In Authorize. ctx.state.jwtdata = ', ctx.state.jwtdata);

        await setAccessToken(ctx, ctx.state.jwtdata.user);
        await next();
    };
};

