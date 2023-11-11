// persistent key-value store 
const storage = require('node-persist');
storage.init();

const set  = async (key, value) => {
    return new Promise((resolve, reject) => {
        // should be setItem, but this prevents errors if key exits
        storage.updateItem(key, value)
            .then( write_res => {
                console.log('results', write_res);
                return resolve();
            })
            .catch( error => {
                return reject(error);
            });
    })
}

const get = async (key) => {
    return new Promise((resolve, reject) => {
        storage.getItem(key)
            .then( rets => {
                resolve(rets);
            }).catch( error => {
                reject(error);
            });
    })
}

module.exports = {
    get,
    set,
};
