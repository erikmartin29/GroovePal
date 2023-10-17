const dbConnection = require('../database/mySQLconnect');
const setAccessToken = require('../utils/setAccessToken');

const authorizeUser = async (ctx) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM users WHERE user_id = ? and user_pass = ? limit 1';
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.user_id, ctx.request.body.user_pass]
        }, ( error, tuples ) => {
            if ( error  ) {
                console.log(`Error From LoginController::authorizeUser - ${error}`);
                reject(error);
            }
            if (tuples.length < 1) {
                console.log('not able to find user');
                ctx.status = 505;
                reject('error invalid user');
            }
            setAccessToken(ctx, tuples);
            ctx.body = {
                status: 'OK',
                user: tuples[0],
            };
            resolve();
        })
    }).catch( err => {
        console.log(err);
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
            values: [ctx.request.body.user_id,ctx.request.body.user_pass,ctx.request.body.user_fname,ctx.request.body.user_lname]
        }, ( error, tuples ) => {
            if ( error ) {
                console.log(error);
                ctx.status = 500;
                ctx.body = 'unable to create user';
            }
            ctx.status = 200;
            ctx.body = 'ok';
            resolve();
        });
    }).catch( err => console.log(err));
};

module.exports = {
    authorizeUser,
    createUser,
};
