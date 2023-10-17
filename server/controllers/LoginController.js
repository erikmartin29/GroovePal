const dbConnection = require('../database/mySQLconnect');

const authorizeUser = async (ctx) => {
    return new Promise((resolve, reject) => {
        let query = 'SELECT * FROM users WHERE user_id = ?';
        dbConnection.query({
            sql: query,
            values: [ctx.params.user_id]
        }, ( error, tuples ) => {
            if ( error  ) {
                console.log(`Error From LoginController::authorizeUser - ${error}`);
                reject(error);
            }
            if ( tuples.length === 1 ) {
                // setAccessToken(ctx, tuples[0]);
                ctx.body = {
                    status: 'OK',
                    user: tuples[0],
                };
            } else {
                console.log('not able to find user');
                reject();
            }
            resolve();
        })
    }).catch( err => {
        console.log(err);
    });
};

module.exports = {
    authorizeUser,
};
