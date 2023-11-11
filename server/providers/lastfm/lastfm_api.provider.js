var LastfmAPI = require('lastfmapi');

require('dotenv').config({path: "/../../dotenv"}); //TODO: remove this line later

var lfm = new LastfmAPI({
	'api_key' : process.env.LASTFM_API_KEY,
	'secret' : process.env.LASTFM_API_SECRET
});

// TEST CONNECTION //
lfm.artist.getInfo({
	'artist' : 'underscores',
}, function (err, artist) {
	if (err) { throw err; }
	console.log("Connection to LastFM API successful!")
});

module.exports = lfm;
