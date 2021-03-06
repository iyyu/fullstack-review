const express = require('express');
const github = require('../helpers/github.js');
const db = require('../database/index.js');
let app = express();

app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  var username = req.body;
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
  })
  req.on('end', function (err, data) {
    if (err) { throw err; }
    var parsed = JSON.parse(body);
    github.getReposByUsername(parsed.username, () => {
      res.sendStatus(201);
      res.send();
    });
    

  // it can be good to send specific information but sending a status to the ajax request is better because the header will let the ajax call know that it's been successful/created
  })
  
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  
  db.findAllRepos((err, repos) => {
    res.send(repos);
  });
});

app.get('/top', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  // finds freshes repos sorted by updated_at
  db.findTopRepos((err, repos) => {
    res.send(repos);
  });
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

