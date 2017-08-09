var express = require('express');
var app = express();
var port = 5000;

// serve static files from /public
app.use(express.static(__dirname + '/dist'));

// routes
var routes = require('./routes/index');
app.use('/',routes);

app.listen(port, function () {
  console.log('Express app listening on port '+port);
});