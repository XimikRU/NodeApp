var express = require('express');
var sqlite3 = require('sqlite3').verbose()
var bodyParser= require('body-parser')
var birds = require('./birds')

var app = express();
var db = new sqlite3.Database('Exercises.db');
var port = 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.locals.title = 'title';
app.locals.email = 'email@sr';

app.listen(port, function(){
      console.log("Server is listening on port 3000");
});

app.get('/', function (req, res){
      res.sendFile(__dirname + '/index.html')
});

app.get('/quotes', function(request, response){

   db.all("SELECT * FROM Quotes", function(err, rows){
        console.log("GET Quotes: The database currently contains the following: " + rows);

        response.send(rows);
    });
});

app.get('/quotes/:author', function(request, response){

   db.all("SELECT * FROM Quotes WHERE Author = ?", [request.params.author], function(err, rows){
        console.log("GET Request for author: " + request.params.author);

        response.send(rows);
    });
});

app.post('/quotes', (req, res) => {
    db.run("INSERT INTO Quotes VALUES ('" + req.body.name + "','" + req.body.quote + "')");
    console.log(req.body);
});

app.get('/get/:id', function (req, res) {
    res.send(req.params);
});

app.post('/post/:id', function(req, res){
    res.send(req.params);
});

app.put('/put/:id', function(req, res) {
    res.send(req.params);
});

app.delete('/del/:id', function(req, res) {
    res.send(req.params);
});

app.use('/birds', birds);







/* ---------------------------------------------------------------------- */

// -------- !
app.get('/example/b', function (req, res, next) {
  console.log('the response will be sent by the next function ...')
  next()
}, function (req, res) {
  res.send('Hello from B!')
})

// -------- !
var cb0 = function (req, res, next) {
  console.log('CB0')
  next()
}

var cb1 = function (req, res, next) {
  console.log('CB1')
  next()
}

var cb2 = function (req, res) {
  res.send('Hello from C!')
}

app.get('/example/c', [cb0, cb1, cb2])

// ------- !
app.route('/book')
  .get(function (req, res) {
    res.send('Get a random book')
  })
  .post(function (req, res) {
    res.send('Add a book')
  })
  .put(function (req, res) {
    res.send('Update the book')
  })
