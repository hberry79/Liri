//http://gt.bootcampcontent.com/GT-Coding-Boot-Camp/01-17-Class-Content/blob/master/10-intro-node-three-days/2-Homework/Instructions/homework_instructions.md

var request = require('request');
var twitter = require('twitter');
var spotify = require('spotify');
var keys = require("./keys.js");
var inputString = process.argv[2];
var fs = require('fs');

var client = new twitter({
  consumer_key: keys.twitterKeys.consumer_key,
  consumer_secret: keys.twitterKeys.consumer_secret,
  access_token_key: keys.twitterKeys.access_token_key,
  access_token_secret: keys.twitterKeys.access_token_secret
});


switch (inputString){

	case "help":
	console.log("Liri is a bot that can connect to your twitter, spoitfy, and the OMBD database. Try typing node liri.js my-tweets, node liri.js spotify-this-song, node liri.js movie-this, or node liri.js do-what-it-says.");
	break;

	//=========================================

	case "my-tweets":
	getTweets();
	break;

	//=========================================

	case "spotify-this-song":
	var songName = process.argv[3];
	getSong();
	break;

	//=========================================

	case "movie-this":
	console.log("  ");
	break;

	//=========================================
	
	case "do-what-it-says":
	console.log("  ");
	break;
}//end of switch case function

//=========================================
//fuctions defined
//=========================================

function getTweets(){
	var params = {screen_name: 'potus',
	count: 20};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error) {
	  	for (var i = 0; i < tweets.length; i++) {
	  		console.log('%j \n', tweets[i].text);
	  		}
		}
	});
}//end of get Tweets

//=========================================

function getSong(){
 	if (process.argv.length < 4) {
		console.log("type it");
		return;
 	}

 	spotify.search({ type: 'track', query: songName }, function(err, data) {

    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
 	
    console.log(data.tracks.items[0].album.artists[0].name);
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].preview_url);
    console.log(data.tracks.items[0].album.name);
		
	});
}//end of getSong

//=========================================

