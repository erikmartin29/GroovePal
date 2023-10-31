const brcypt = require('bcrypt');

const saltRounds = process.env.SALTROUNDS || 10;

// takes plaintext password and returns hashed password: safe to store in db
async function encrypt(password) {
    return new Promise( (resolve, reject) => {
        brcypt.genSalt(saltRounds, (err, salt) => {
            if (err)
                reject(err);
            brcypt.hash(password, salt, (err, hash) => {
                if ( err ) 
                    reject(err);
                resolve(hash); // hashed password
            });
        });
    });
}

// compare hashed password from database to plaintext pass in request body
async function compare(password, hashed_password) {
    return new Promise( (resolve, reject) => {
        brcypt.compare(password, hashed_password, (err, result) => {
            if ( err )
                reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    encrypt,
    compare,
};
