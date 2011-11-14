
/**
 * Module dependencies.
 */

var express = require('express');
var app = module.exports = express.createServer();

var mongoose = require('mongoose');
 
// Connects to one database
var db;
var Document;

// Configuration
app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

/**
 * Configurations.
 */

// Configuration Development
app.configure('development', function() {
  app.use(express.logger({ format: ':method :uri' }));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/poblio-development');
});

app.configure('production', function() {
  app.use(express.logger());
  app.use(express.errorHandler()); 
  db = mongoose.connect('mongodb://localhost/poblio-production');
});

app.configure('test', function() {
  app.use(express.logger());
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
  db = mongoose.connect('mongodb://localhost/poblio-test');
});

app.Document = Document = require('./models.js').Document(db);

app.get('/', function(req, res) {
  res.redirect('/buy')
});

/**
 * Route Pages.
 */


// Document list
app.get('/buy', function(req, res) {
  res.render('documents/index.jade', { title: 'Poblio' });
});


app.get('/buy.:format?', function(req, res) {
  Document.find().all(function(documents) {
    switch (req.params.format) {
      case 'json':
        res.send(documents.map(function(d) {
          return d.__doc;
        }));
      break;

      default:
        res.render('sell/index.jade', {
          locals: { documents: documents }
        });
    }
  });
});


app.get('/sell', function(req, res) {
  res.render('documents/sell.jade', {
    locals: { d: new Document() }
  });
});

// Create document 
app.post('/buy.:format?', function(req, res) {

});

// Read document
app.get('/buy/:id.:format?', function(req, res) {

});

// Update document
app.put('/buy/:id.:format?', function(req, res) {

});

// Delete document
app.del('/buy/:id.:format?', function(req, res) {

});

if (!module.parent) {
  app.listen(3000);
  console.log("Express server listening on port %d in %s mode http://localhost:3000/", app.address().port, app.settings.env);
}

