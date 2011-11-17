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
  app.use(express.favicon());
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
  res.render('buy', { title: 'Poblio' });
});
/*
app.get('/buy.:format', function(req, res) {
  console.log('working');
  Document.find({}, function(err, doc) {
    console.log('working');
    switch (req.params.format) {
      case 'json':
        res.send(doc.map(function(d) {
          console.log('working');
          return d.toObject();
        }));
      break;

      default:
        res.send('Format not available fuck', 400);
    }
  });
});
*/

app.get('/sell', function(req, res) {
  res.render('sell', {
    locals: { d: new Document() }
  });
});

app.get('/admin', function(req, res) {
  Document.find({}, function(err,doc) {
    if(err) {
      res.write('loading error');
    } else {
      res.render('admin', { title: 'admin', listings: doc });
      console.log(doc); 
    }
  });
  console.log("after Document.find");
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
  console.log("Express server listening on port %d in %s mode http://localhost:%d/", app.address().port, app.settings.env, app.address().port);
}
