var express = require('express');
var app = express();
var morgan  = require('morgan');
var swig = require('swig');
var socketio = require('socket.io');
var routes = require('./routes/');

var server = app.listen(3000);
var io = socketio.listen(server);

app.use(express.static(__dirname + '/public'));

swig.setDefaults({cache: false});

app.use(morgan('dev'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');
var router = ('/', routes(io));
app.use('/', router);


var people = [{name: 'Full'}, {name: 'Stacker'}, {name: 'Son'}];


app.get('/', function(req, res, next){
  routes.get();
});
// // app.get('/tweets/', function(req, res, next){

// })
// app.post('/tweets/', function(req, res, next){

// })
// app.get('/news', function(req, res){
//   //res.send('goodbye, world');
//   res.render('index', {title: 'Hall of Fame', people: people});
// })

// app.get('/', function(req, res){
//   res.send('hello, world');
// })


