var http = require('http');
var express = require('express');
var cors = require('cors');
var app = express();
var jwt = require('express-jwt');
var dotenv = require('dotenv');

// dotenv.load();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_CLIENT_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});


app.use(cors());

// Request body parsing middleware should be above methodOverride
// app.use(express.bodyParser());
// app.use(express.urlencoded());
// app.use(express.json());

// app.use('/secured', authenticate);


// app.use(app.router);

var root = __dirname + '/'
app.use('/', express.static(root))

// app.use('/secured', authenticate);

app.get('/secured', authenticate, function(req, res) {
  res.send(200, {text: "from secured server-1.js -- All good. You don't need to be authenticated to call this"});
});

app.get('/ping', function(req, res) {
  res.send(200, {text: "from server-1.js -- All good. You don't need to be authenticated to call this"});
});

app.get('/secured/ping', function(req, res) {
  res.send(200, {text: "from server-1.js -- All good. You only get this message if you're authenticated"});
})

var port = process.env.PORT || 8080;

http.createServer(app).listen(port, function (err) {
  console.log('listening in http://localhost:' + port);
});
