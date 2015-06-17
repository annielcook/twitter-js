var express = require('express');
var router = express.Router();
// could use one line instead: var router = require('express').Router();
var tweetBank = require('../tweetBank.js');

router.get('/', function (req, res, next) {
  var tweets = tweetBank.list();
  res.render( 'index', { title: 'Twitter.js', tweets: tweets } );
});

// say that a client GET requests the path /users/nimit
router.get( '/users/:name', function (req, res, next) {
  var name = req.params.name; // --> 'Nimit%'

  var tweeter = {} ;
  var tweetList = tweetBank.list();
  for (var i = 0; i < tweetList.length; i++){
  	if(tweetList[i].name === name) {
  		tweeter = tweetList[i];
  	}
  }
  console.log(tweeter);
  var list = tweetBank.find( {name: tweeter.name} );
  res.render( 'index', {title: 'Twitter.js - Posts by ' + name, tweets: list});
});

router.get('/users/:name/tweets/:id', function (req, res, next){
	var tweet = tweetBank.find({id: Number(req.params.id)});
	console.log(tweet);
	res.render('index', {title: 'Twittter.js tweeet id ' + tweet.id, tweets:tweet});
})




module.exports = router;