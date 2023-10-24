const lfm = require('./lastfm_api.provider.js');

var callbackURL = 'http://127.0.0.1:' + 1137;

var http = require('http');
var url = require('url');

http.createServer(function (req, res) {
	var pathname = url.parse(req.url).pathname;

	if (pathname === '/') {
		var authUrl = lfm.getAuthenticationUrl({ 'cb' : callbackURL + '/auth' });

		res.writeHead(200, { 'Content-Type' : 'text/html' });
		res.end('<a href="' + authUrl + '">Authenticate</a>');
		return;
	}

	if (pathname === '/auth') {
		var token = url.parse(req.url, true).query.token;

		lfm.authenticate(token, function (err, session) {
			if (err) {
				res.writeHead(401, { 'Content-Type' : 'text/plain' });
				res.end('Unauthorized');

			} else {
				res.writeHead(200, { 'Content-Type' : 'text/html' });
				res.write('<p>Authentication successful. You can now make authenticated method calls.</p>');
				res.write('<pre>' + JSON.stringify(session, null, '    ') + '</pre>');
				res.write('<p>Store this data for future authentication.</p>');
				res.write('<p>Use <code>lfm.setSessionCredentials(\'' + session.username + '\', \'' + session.key + '\');</code> for automatic authentication in the future.</p>');
				res.end('<pre>:)</pre>');
			}

            //store session credentials for future use
            lfm.setSessionCredentials(session.username, session.key);
            
            //perform a test scrobble for this user.
            testScrobble();
		});

		return;
	}

	res.writeHead(404, { 'Content-Type' : 'text/plain' });
	res.end('Not found');


}).listen(1137);

console.log('Server running.');
console.log(callbackURL);

function testScrobble() {
    lfm.track.scrobble({
        'artist' : 'Test Artist',
        'track' : 'Test Track',
        'timestamp' : Math.floor(Date.now() / 1000) - 120
    }, function (err, scrobbles) {
        if (err) { throw err; }
        console.log("Scrobble successful!");
    });
}