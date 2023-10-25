const dbConnection = require('../database/mySQLconnect');
const setAccessToken = require('../utils/setAccessToken');
const passwordEncryption = require('../utils/passwordEncrypt');

const authorizeUser = async (ctx) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM users WHERE user_id = ? limit 1';
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.user_id, ctx.request.body.user_pass]
        }, async ( error, tuples ) => {
            if ( error  ) {
                console.log(`Error From LoginController::authorizeUser - ${error}`);
                reject(error);
            }
            try {
                const matched = await passwordEncryption.compare(ctx.request.body.user_pass, tuples[0].user_pass);
                if ( matched ) {
                    console.log('passwords match');
                    setAccessToken(ctx, tuples);
                    ctx.status = 200;
                    ctx.body = {
                        status: 'OK',
                        user: {
                            user_id: tuples[0].user_id,
                            user_fname: tuples[0].user_fname,
                            user_lname: tuples[0].user_lname,
                        },
                    };           
                } else {
                    ctx.status = 204; // unathed
                    ctx.body = {
                        msg: `incorrect password`
                    }
                }
                resolve(matched);
            } catch (e) {
                console.log('error in comparison', e);
                ctx.status = 204; // unauthed
                ctx.body = {
                    error: true,
                    msg: `invalid password: ${e}`
                }
                reject(e);
            }
        })
    }).catch( err => {
        console.log('error in promise', err);
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
                reject();
            }
            ctx.status = 200;
            ctx.body = tuples;
            resolve();
        });
    }).catch( err => console.log(err));
};

const validateUsername = async (ctx) => {
    return new Promise( (resolve, reject) => {
        const query = `
            SELECT user_id FROM users WHERE user_id = ?;
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.query.user_id]
        }, ( error, tuples ) => {
            if ( error ) {
                console.log(error);
                ctx.status = 500;
                ctx.body = 'error acccessing users table';
                reject();
            }
            ctx.status = 200;
            ctx.body = `{ "valid": ${(tuples.length === 0)} }`;
            resolve();
        });
    }).catch( err => console.log(err) );
}

module.exports = {
    authorizeUser,
    createUser,
    validateUsername,
};
