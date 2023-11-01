const User = require('../models/user');
const setAccessToken = require('../utils/setAccessToken');
const passwordEncryption = require('../utils/passwordEncrypt');

const authorizeUser = async (ctx) => {
    return new Promise( async (resolve, reject) => {
        const query = 'SELECT * FROM users where user_id = ? limit 1';
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.user_id],
        }, ( error, tuples ) => {
            if ( error ) {
                console.log(`ERROR [from UserController::authorizeUser]: ${error}`);
                ctx.status = 500;
                ctx.body = 'invalid username or password';
                reject()
            }
            if ( tuples[0].user_pass === undefined ) {
                console.log(`ERROR: invalid username`);
                reject();
            }
            passwordEncryption.compare(ctx.request.body.user_pass, tuples[0].user_pass)
            .then ( matched => {
                if ( matched ) {
                    setAccessToken(ctx, tuples);
                    ctx.status = 200;
                    ctx.body = {
                        user: {
                            user_id: tuples[0].user_id,
                            user_pass: tuples[0].user_pass,
                            user_fname: tuples[0].user_fname,
                            user_lname: tuples[0].user_lanem,
                        },
                        msg: 'authed'
                    };
                } else {
                    ctx.status = 204;
                    ctx.body = {
                        user: 'none',
                        msg: 'password incorrect',
                    };
                }
                resolve();
            });
        });
    }).catch( e => {
            console.log(e);
    });
};

const createUser = async (ctx) => {
    return new Promise( (resolve, reject) => {
        const query = `
            INSERT INTO 
            users
            (user_id, user_pass, user_fname, user_lname)
            VALUES
            (?,?,?,?);
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.user_id, ctx.request.body.user_pass, ctx.request.body.user_fname, ctx.request.body.user_lname],
        }, (error, tuples) => {
            if ( error ) {
                console.log(`ERROR [from UserController::authorizeUser]: ${error}`);
                ctx.status = 500;
                ctx.body = 'invalid username or password';
                reject()
            }
            console.log(tuples);
            ctx.status = 200;
            // send user credentials back to client
            ctx.body = ctx.request.body;
            resolve();
        })
    }).catch( e => console.log(e));
};

module.exports = {
    authorizeUser,
    createUser,
};
