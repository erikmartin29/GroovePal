const jwt = require('jsonwebtoken');

function setAccessToken(ctx, user) {
    console.log('setAccessToken:: cookie = ', ctx.cookies.get('access_token'));
    console.log('setAccessToken:: ctx.state contains', ctx.state);

    const exp_date = Date.now() + (20 * 60 * 1000);

    let token_opts = {
        type: 'web',
        exp: Math.floor(exp_date / 1000 + (60 * 1)), 
        user: user
    };

    // sign access token
    const access_token = jwt.sign(token_opts, process.env.JWT_KEY);

    ctx.cookies.set('access_token', access_token, {
        httpOnly: true,
        expires: new Date(exp_date),
    });
}

module.exports = setAccessToken;
