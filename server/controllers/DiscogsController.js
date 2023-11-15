var Discogs = require('disconnect').Client;

const getCollection = async (ctx) => {
    try {
        console.log('creds', ctx.request.body.credentials)
        // query Discogs using collection endpoint
        const dis = new Discogs(ctx.request.body.credentials)
        const discogs_user = await dis.getIdentity();

        // to change it because this works for now
        var col = dis.user().collection();

        // wrap getReleases in a new Promise
        var releasesData = await new Promise((resolve, reject) => {
            col.getReleases(`${discogs_user.username}`, 0, {page: 1, per_page: 75}, function(err, data){
                if (err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });

        ctx.body = releasesData;
        ctx.status = 200;
        
        //console.log(ctx.body)
        console.log(ctx.status)
        
    } catch (error) {
        console.error('Error in getCollection:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
};

const getRelease = async (ctx) => {
    try {
        // check if releaseID parameter is present
        const releaseID = ctx.params.releaseID;
        if (releaseID === undefined) { 
            ctx.status = 400;
            ctx.body = { error: "ReleaseID parameter is missing" };
            return;
        }

        // query Discogs using database endpoint
        var db = new Discogs(ctx.request.body.credentials).database();

        var releaseData = await new Promise((resolve, reject) => {
            db.getRelease(releaseID, function(err, data){
                if ( err )
                    reject(err);
                else
                    resolve(data);
            });
        });
        
        // wait for the getRelease call to complete before continuing
        await new Promise(resolve => setTimeout(resolve, 1000));
        ctx.body = releaseData;
        ctx.status = 200;
    } catch (error) {
        console.error('Error in getRelease:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
};

const getReleaseImage = async (ctx) => {
    try {
        // check if releaseID parameter is present
        const releaseID = ctx.params.releaseID;
        if (releaseID === undefined) { 
            ctx.status = 400;
            ctx.body = { error: "ReleaseID parameter is missing" };
            return;
        }

        // query Discogs using collection endpoint
        var db = new Discogs(ctx.request.body.credentials).database();

        var imgUrl = await new Promise((resolve, reject) => {
            db.getRelease(releaseID, function(err, data){
                if ( err )
                    reject(err);
                else
                    resolve(data.images[0].resource_url);
            });
        });
        
        // wait for the getRelease call to complete before continuing
        await new Promise(resolve => setTimeout(resolve, 1000));
        ctx.body = imgUrl;
        ctx.status = 200;
    } catch (error) {
        console.error('Error in getReleaseImage:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
};

module.exports = { getCollection, getRelease, getReleaseImage };
