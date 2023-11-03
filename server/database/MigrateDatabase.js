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
    CREATE TABLE IF NOT EXISTS secrets (
        secret   VARCHAR(255) NOT NULL,
        owner_id VARCHAR(255) NOT NULL,
        provider VARCHAR(20)  NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(user_id),
        PRIMARY KEY (owner_id, provider)
    );
    `,
];

// create database tables if they do not exist
async function createTables() {
    return new Promise( (resolve, reject) => {
        const logs = [];
        for ( const table of tables ) {
            console.log(`executing: ${table}`);
            dbConnection.query(table, (error, results) => {
                if ( error ) {
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
