const dbConnection = require('../database/mySQLconnect');

const addScrobbles = async ( scrobbles, user_id, image_url ) => {
    return new Promise((resolve, reject) => {
        const query = `
            INSERT INTO scrobbles
            (owner_id, track_name, track_artist, track_album, timestamp, image_url)
            VALUES
            (?,?,?,?,?,?);
        `;
        for ( let scrobble of scrobbles ) {
            dbConnection.query({
                sql: query,
                values: [
                    user_id, 
                    scrobble.track, 
                    scrobble.artist, 
                    scrobble.album,
                    scrobble.timestamp,
                    image_url,
                ]
            }, (error, result) => {
                if ( error ) {
                    reject(error);
                }
                resolve(result);
            })
        }
    })
}

const getScrobblesByUser = async ( user_id ) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT * 
            FROM scrobbles 
            WHERE owner_id = ? 
                ORDER BY timestamp DESC;
        `;
        dbConnection.query({
            sql: query,
            values: [user_id]
        }, ( error, results ) => {
            if ( error ) 
                reject(error);
            resolve(results);
        });
    });
}

module.exports = {
    addScrobbles,
    getScrobblesByUser,
};
