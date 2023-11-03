const dbConnection = require('../database/mySQLconnect');

const storeSecretKey = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO secrets
            (secret, owner_id, provider)
            VALUES
            (?,?,?);
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.token, ctx.request.body.user_id, ctx.request.body.provider]
        }, ( error, results) => {
            if ( error ) {
                console.log(`Error in secrets controller: ${error}`);
                ctx.status = 500;
                ctx.body = {
                    msg: error,
                }
                return reject();
            }
            console.log(results);
            ctx.status = 200;
            ctx.body = ctx.request.body;
            return resolve()
        })
    }).catch( err => console.log(err));
};

const getSecretKey = async (ctx) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * 
            FROM secrets 
            WHERE 
                provider = ?
            AND
                owner_id = ?;
        `;
        dbConnection.query({
            sql: query,
            values: [ctx.request.body.provider, ctx.request.body.user_id]
        }, (error, results) => {
            if ( error ) {
                console.log(`Error in secrets controller: ${error}`);
                ctx.status = 500;
                ctx.body = {
                    msg: error,
                }
                return reject();
            }
            if ( results[0].secret === undefined ) {
                ctx.status = 204;
                ctx.body = {
                    msg: 'no token for user'
                }
                return reject();
            } 
            ctx.status = 200;
            ctx.body = {
                ...ctx.request.body,
                token: results[0].secret
            }
            return resolve();
        })
    }).catch( err => console.log(err));
};

const replaceSecret = async (ctx) => {
    return new Promise( (resolve, reject) => {

    })
}

module.exports = {
    storeSecretKey,
    getSecretKey,
    replaceSecret,
};
