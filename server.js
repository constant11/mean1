var express = require("express");
var mongojs = require('mongojs');

var app = express();


app.use(express.static(__dirname + '/public'));
app.use(express.bodyParser());

// depending on the placement, we can either catch or override routes
app.use(app.router);
 

console.log("server.js");
// every route in the routes/phoneBook.js file will be served under /phoneBook
app.use('/phoneBook', require('./server/routes/phoneBook').middleware);
 
// last middleware will be 404 handler
app.use(function(req, res, next) {
    // 404 handler
});


app.listen(3000);