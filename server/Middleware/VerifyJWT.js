const jwt = require('koa-jwt');

module.exports = jwt({
    secret: process.env.JWT_KEY,
    cookie: 'access_token',
    key: 'jwtdata',
    debug: true
});
