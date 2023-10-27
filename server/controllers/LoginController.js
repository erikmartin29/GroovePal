const User = require('../models/user');
const setAccessToken = require('../utils/setAccessToken');
const passwordEncryption = require('../utils/passwordEncrypt');

const authorizeUser = async (ctx) => {
    return new Promise( async (resolve, reject) => {
        try {    
            const user = await User.findOne({
                attributes: ['user_id', 'user_pass']
            });
            const matched = await passwordEncryption.compare(
                ctx.request.body.user_pass,
                user.user_pass
            );
            if (matched) {
                console.log('passwords match');
                setAccessToken(ctx, user);
                ctx.status = 200;
                ctx.body = {
                    status: 'authed',
                    user: {
                        user_id: user.user_id,
                        user_fname: user.user_fname,
                        user_lname: user.user_lname,
                    },
                };   
            } else {
                console.log('passwords do NOT match');
                ctx.status = 204; // unauthed
                ctx.body = {
                    msg: `incorrect password`
                }
            }
            resolve();
        } catch (e) {
            console.log(e);
            ctx.status = 204; // unauthed
                ctx.body = {
                    error: true,
                    msg: `invalid password: ${e}`
                }
            reject();
        }
    });
};

const createUser = async (ctx) => {
    return new Promise( (resolve, reject) => {
        User.create({
            user_id: ctx.request.body.user_id,
            user_pass: ctx.request.body.user_pass,
            user_fname: ctx.request.body.user_fname,
            user_lname: ctx.request.body.user_lname,
        }).then( user => {
            console.log(user);       
            ctx.status = 200;
            ctx.body = 'new user created';
            resolve();
        }).catch( error => {
            console.log(error);
            ctx.status = 500;
            ctx.body = 'error creating user';
            reject();
        });
    });
};

module.exports = {
    authorizeUser,
    createUser,
};
