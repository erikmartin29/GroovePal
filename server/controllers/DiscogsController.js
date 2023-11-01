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
        var col = new Discogs().user().collection();
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

module.exports = { getCollection };