const encryption = require('../utils/passwordEncrypt');

module.exports = () => {
    return async (ctx, next) => {
        console.log("hashing password");
        console.log(ctx.request.body);
        try {
            const hashed_pass = await encryption.encrypt(ctx.request.body.user_pass);
            ctx.request.body.user_pass = hashed_pass;
            return next();
        } catch(e) {
            console.log('ERROR: ', e);
            ctx.status = 500; // unauthed
            ctx.body = {
                msg: 'e'
            }
        }
    }
}
