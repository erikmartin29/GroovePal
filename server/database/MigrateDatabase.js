const User = require('../models/user');

// sync all the models that correspond to a table in the database
module.exports = async () => {
    return new Promise( async (resolve, reject) => {
        const models = [User];
        try {
            for ( let model of models ) {
                console.log(`Syncing Table: ${model.tableName}`);
                await model.sync({ force: false });
            }
        } catch (e) {
            console.log(`ERROR: ${e}`);
            reject();
        } finally {
            resolve();
        }
    })
}

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
        secret_id    VARCHAR(10)  NOT NULL,
        secret_value VARCHAR(255) NOT NULL,
        owner_id     VARCHAR(100) NOT NULL,
        FOREIGN KEY (owner_id) REFERENCES users(user_id),
        PRIMARY KEY (secret_id)
    );
    `
];

// create database tables if they do not exist
async function createTables() {
    return new Promise( (resolve, reject) => {
        for ( const table of tables ) {
            dbConnection.query(table, (error, results) => {
                if ( error ) {
                    console.log(error);
                    reject();
                }
                console.log(results);
            })
        }
        resolve();
    }).catch( e => console.log(e) );
}

// todo clean migration function

module.exports = {
    createTables,
};
