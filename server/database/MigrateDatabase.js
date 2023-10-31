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

