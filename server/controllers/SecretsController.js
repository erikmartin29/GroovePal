const dbConnection = require('../database/mySQLconnect');

const storeDiscogsSecretKey = async ({ token, token_secret, user_id }) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO discogs_secrets
            (token, token_secret, owner_id)
            VALUES
            (?,?,?);
        `;
        dbConnection.query({
            sql: query,
            values: [token, token_secret, user_id]
        }, ( error, results) => {
            if ( error ) {
                return reject(error);
            }
            return resolve(results)
        })
    }).catch( err => console.log(err));
};

const getDiscogsSecretKey = async ({ user_id }) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * 
            FROM discogs_secrets 
            WHERE owner_id = ?;
        `;
        dbConnection.query({
            sql: query,
            values: [user_id]
        }, (error, results) => {
            if ( error ) 
                reject(error);
            resolve(results[0]);
        })
    }).catch( err => console.log(err));
};

const setLastfmSecretKey = async({ session_user, session_key, user_id }) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO lastfm_secrets
            (session_user, session_key, owner_id)
            VALUES
            (?,?,?);
        `;
        dbConnection.query({
            sql: query,
            values: [session_user, session_key, user_id]
        }, ( error, results) => {
             if ( error ) {
                return reject(error);
            }
            return resolve(results)
        })
    })
}

const getLastfmSecretKey = async({ user_id }) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT *
            FROM lastfm_secrets
            WHERE owner_id = ?;
        `;
        dbConnection.query({
            sql: query,
            values: [user_id]
        }, (error, results) => {
            if ( error ) 
                reject(error);
            resolve(results[0]);
        });
    });
};

module.exports = {
    storeDiscogsSecretKey,
    getDiscogsSecretKey,
    setLastfmSecretKey,
    getLastfmSecretKey
};
