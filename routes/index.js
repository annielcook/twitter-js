
//module.exports = router;

module.exports = function (io) {
  //define here

  var express = require('express');
  var parser = require('body-parser');
  var router = express.Router();
  // could use one line instead: var router = require('express').Router();
  var tweetBank = require('../tweetBank.js');

  router.use(parser.urlencoded({extended: false}));
  router.use(parser.json());

  router.get('/', function (req, res, next) {
    var tweets = tweetBank.list();
    res.render( 'index', { title: 'Twitter.js', tweets: tweets, showForm: true , input_name: ''} );
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
    //console.log(name);
    var html_name = name.split(' ')[0] + ' ' + name.split(' ')[1];
    console.log(html_name);
    res.render( 'index', {title: 'Twitter.js - Posts by ' + name, tweets: list, input_name: html_name, showForm:true});
  });

  router.get('/users/:name/tweets/:id', function (req, res, next){
    var tweet = tweetBank.find({id: Number(req.params.id)});
    res.render('index', {title: 'Twittter.js tweeet id ' + tweet.id, tweets:tweet});
  });

  router.post('/submit', function(req, res) {
    var name = req.body.name;
    var text = req.body.text;
    tweetBank.add(name, text);
    io.sockets.emit('new_tweet', { message: 'new message' });
    //res.redirect('/');
    
  });

  return router;
};