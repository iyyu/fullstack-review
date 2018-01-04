const request = require('request');
const config = require('../config.js');
const db = require('../database/index.js');

//13be09addbea6f9a995e5b247078ff8d6881f429

let getReposByUsername = (username, callback) => {
  // TODO - Use the request module to request repos for a specific user from the github API
  // The options object has been provided to help you out, but you'll have to fill in the URL

  let options = {
    url: `https://api.github.com/users/${username}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get(options, function (error, response, body) {
    if (error) {
      console.log('error from github.js', error);
    }
    JSON.parse(body).forEach((repo) => {
      let eachRepo = new db.RepoModel({
        repo_id: repo.id,
        repo_name: repo.name,
        repo_url: repo.html_url,
        owner_name: repo.owner.login,
        description: repo.description,
        updated_at: repo.updated_at
      });
      eachRepo.save(function(err, data) {
        if (err) {
          console.log('did not save', err);
        }
      });
    })
  })
  callback();
  // .on('response', function() {
  //   callback();
  // });
}

module.exports.getReposByUsername = getReposByUsername;