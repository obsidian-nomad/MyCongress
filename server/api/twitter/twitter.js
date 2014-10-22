var OAuth2 = require('OAuth').OAuth2;
var https = require('https');

var key = 'jme4K9z84BSLZlt7flFDzpdFn';
var secret = 'Wtee2DqGTzZIDadMPeN0Qh7Fy2cwhzlRBG7W65WYougB581BhA';

var oauth2 = new OAuth2(key, secret, 'https://api.twitter.com/', null, 'oauth2/token', null);
module.exports.twitter = function(congresspersonID, cb){
    oauth2.getOAuthAccessToken('', {
        'grant_type': 'client_credentials'
    }, function (e, access_token) {
     
        var options = {
            hostname: 'api.twitter.com',
            path: '/1.1/statuses/user_timeline.json?screen_name=' + congresspersonID,
            headers: {
                Authorization: 'Bearer ' + access_token
            }
        };
     
     
        https.get(options, function (result) {
            var buffer = '';
            result.setEncoding('utf8');
            result.on('data', function (data) {
                buffer += data;
            });
            result.on('end', function () {
                var tweets = JSON.parse(buffer);
                cb(tweets);
            });
        });
    });
}
