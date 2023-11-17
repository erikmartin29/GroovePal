const jwt = require('jsonwebtoken');

async function setAccessToken(ctx, user) {
    return new Promise((resolve) => {
        console.log('setAccessToken:: cookie = ', ctx.cookies.get('access_token'));
        console.log('setAccessToken:: ctx.state contains', ctx.state);

        const time_issued = new Date();

        const exp_date = new Date(time_issued);
        exp_date.setHours(exp_date.getHours() + 48); // tokens live for 48 hours

        let token_opts = {
            type: 'web',
            exp: Math.floor(exp_date.getTime()/1000),  // convert to unix timestamp
            user: user
        };

 Math.floor(exp_date / 1000 + (60 * 1))       // sign access token
        const access_token = jwt.sign(token_opts, process.env.JWT_KEY);

        ctx.cookies.set('access_token', access_token, {
            httpOnly: true,
            expires: new Date(exp_date),
        });
        return resolve();
    })
}

module.exports = setAccessToken;
