const dbConnection = require('./mySQLconnect');

const tables = [
    `
    CREATE TABLE IF NOT EXISTS users ( 
        user_id     VARCHAR(100) NOT NULL,
        user_pass   VARCHAR(100) NOT NULL,
        user_fname  VARCHAR(40)  NOT NULL,
        user_lname  VARCHAR(40)  NOT NULL,
        PRIMARY KEY (user_id)
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS lastfm_secrets (
        session_user  VARCHAR(255) NOT NULL,
        session_key   VARCHAR(255) NOT NULL,
        owner_id      VARCHAR(255) NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(user_id),
        PRIMARY KEY (owner_id, session_user)
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS discogs_secrets (
        token        VARCHAR(255) NOT NULL,
        token_secret VARCHAR(255) NOT NULL,
        owner_id     VARCHAR(255) NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(user_id),
        PRIMARY KEY (owner_id, token)
    );
    `,
    `
    CREATE TABLE IF NOT EXISTS scrobbles (
        owner_id      VARCHAR(255)  NOT NULL,
        track_name    VARCHAR(255)  NOT NULL,
        track_artist  VARCHAR(255)  NOT NULL,
        track_album   VARCHAR(255)  NOT NULL,
        timestamp     VARCHAR(255)  NOT NULL, 
        image_url     VARCHAR(255)  NOT NULL,
        release_id    VARCHAR(255)  NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(user_id),
        PRIMARY KEY (owner_id, track_name, timestamp)
    );
    `
];

// create database tables if they do not exist
async function createTables() {
    return new Promise( (resolve, reject) => {
        const logs = [];
        for ( const table of tables ) {
            console.log(`executing: ${table}`);
            dbConnection.query(table, (error, results) => {
                if ( error ) {
                    console.log(error);
                    reject(error);
                }
                logs.push(results);
            })
        }
        resolve(logs);
    }).catch( e => console.log(e) );
}

// todo clean migration function

module.exports = {
    createTables,
};
