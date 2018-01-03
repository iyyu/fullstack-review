const request = require('request');
const config = require('../config.js');

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
    callback(JSON.parse(body));
  })

}

module.exports.getReposByUsername = getReposByUsername;