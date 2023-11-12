var Discogs = require('disconnect').Client;

const getCollection = (ctx) => {
    return new Promise((resolve, reject) => {
        console.log('From getCollection::doing oauth with: ', ctx.request.body.credentials)
        // query Discogs using collection endpoint
        const dis = new Discogs(ctx.request.body.credentials);
        dis.getIdentity()
            .then( discogs_user => {
                // to change it becuase this works for now
                var col = dis.user().collection();
                var releasesData;
                col.getReleases(`${discogs_user.username}`, 0, {page: 1, per_page: 75}, function(err, data) { 
                    ctx.body = data;
                    ctx.status = 200;
                    console.log(ctx.status);
                    console.log(ctx.body);
                    resolve();
                });
            });
    }).catch(error => {
        console.error('Error in getCollection:', error);
        ctx.status = 500;
        ctx.body = 'Internal Server Error';
    });
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
        var db = new Discogs(ctx.request.body.credentials).database();
        var imgUrl;
        db.getRelease(releaseID, function(err, data){
            if ( err )
                console.log(err);
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
