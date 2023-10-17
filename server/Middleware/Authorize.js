const setAccessToken = require('../utils/setAccessToken');

module.exports = () => {
    return (ctx, next) => {
        console.log('In Authorize. ctx.state = ', ctx.state);
        console.log('In Authorize. ctx.state.jwtdata = ', ctx.state.jwtdata);

        setAccessToken(ctx, ctx.state.jwtdata.user);
        return next();
    };
};

