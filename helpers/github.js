const request = require('request');
const config = require('../config.js');

//13be09addbea6f9a995e5b247078ff8d6881f429

let getReposByUsername = (/* TODO */) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL
  let options = {
    url: 'FILL ME IN',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request.get('someURL', function (error, response, body) {

  })

}

module.exports.getReposByUsername = getReposByUsername;