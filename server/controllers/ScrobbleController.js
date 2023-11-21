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

const getArtistFreqByUser = async ( user_id ) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT owner_id, track_artist, COUNT(track_artist) as artist_freq
            FROM scrobbles
            WHERE owner_id = ?
            GROUP BY track_artist
            ORDER BY artist_freq desc;
        `;
        dbConnection.query({
            sql: query,
            values: [user_id],
        }, (error, results) => {
            if ( error ) 
                reject(error);
            resolve(results);
        })
    });
}

const getAlbumFreqByUser = async ( user_id ) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT owner_id, track_artist, track_album, COUNT(track_album) as album_freq
            FROM scrobbles
            WHERE owner_id = ?
            GROUP BY track_album
            ORDER BY album_freq desc;
        `;
        dbConnection.query({
            sql: query,
            values: [user_id],
        }, (error, results) => {
            if ( error ) 
                reject(error);
            resolve(results);
        })
    })

}

module.exports = {
    addScrobbles,
    getScrobblesByUser,
    getAlbumFreqByUser,
    getArtistFreqByUser,
};
