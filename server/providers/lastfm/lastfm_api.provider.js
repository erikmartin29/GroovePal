var LastfmAPI = require('lastfmapi');

require('dotenv').config(); //TODO: remove this line later

var lfm = new LastfmAPI({
	'api_key' : process.env.LASTFM_API_KEY,
	'secret' : process.env.LASTFM_API_SECRET
});

// TEST QUERY //
lfm.artist.getInfo({
	'artist' : 'underscores',
}, function (err, artist) {
	if (err) { throw err; }
	console.log("Connection to LastFM API successful!")
	//console.log(artist.name + " has " + artist.stats.listeners + " listeners");
});

module.exports = lfm;