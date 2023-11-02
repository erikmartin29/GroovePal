var Discogs = require('disconnect').Client;

const getCollection = async (ctx) => {
    try {
        // check if user parameter is present
        const user = ctx.params.user;
        if (user === undefined) { 
            ctx.status = 400;
            ctx.body = { error: "User parameter is missing" };
            return;
        }

        // query Discogs using collection endpoint
        var col = new Discogs('MyUserAgent/1.0').user().collection();
        var releasesData;
        col.getReleases(`${user}`, 0, {page: 1, per_page: 75}, function(err, data){ releasesData = data; });

        // wait for the getReleases call to complete before continuing
        await new Promise(resolve => setTimeout(resolve, 1000));

        ctx.body = releasesData;
        ctx.status = 200;
        //console.log(ctx.status)
        //console.log(ctx.body)
    } catch (error) {
        console.error('Error in getCollection:', error);
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
        // TODO: pass accessData from OAuth into Discogs constructor
        var db = new Discogs(accessData).database();
        var imgUrl;
        db.getRelease(releaseID, function(err, data){
            imgUrl = data.images[0].resource_url;
        });

        // wait for the getRelease call to complete before continuing
        await new Promise(resolve => setTimeout(resolve, 1000));

        ctx.body = imgUrl;
        ctx.status = 200;
        //console.log(ctx.status)
        //console.log(ctx.body)
    } catch (error) {
        console.error('Error in getReleaseImage:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    }
};

module.exports = { getCollection, getReleaseImage };