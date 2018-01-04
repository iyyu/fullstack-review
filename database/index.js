const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo');
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repo_id: {type: String, dropDups: true, unique: true },
  repo_name: String,
  repo_url: String,
  owner_name: String,
  description: String,
  updated_at: String
});
let RepoModel = mongoose.model('Repo', repoSchema);
  //sequelize is to mongoose as mysql is to mongodb
  // a collection is like a table
  // schemas are similar
  
// NOTE FROM MONGOOSE DOCUMENTATION: methods must be added to the schema before compiling it with mongoose.model()

let save = (repoArr) => {
  // TODO: Your code here
  // IY COMMENT: Exporting this function and calling it into the app.post method of server index.js was causing duplicates to be saved into my db. To fix this, we export the model directly so that the github.js function getReposByUsername then creates documents directly and also saves them into the db.
  // This function should save a repo or repos to
  // the MongoDB (which has since been exported)
  // repoArr.forEach((repo) => {
  //   let eachRepo = new RepoModel({
  //     repo_id: `${repo.id}`,
  //     repo_name: `${repo.name}`,
  //     repo_url: `${repo.html_url}`,
  //     owner_name: `${repo.owner.login}`,
  //     description: `${repo.description}`,
  //     updated_at: `${repo.updated_at}`
  //   });
  //   eachRepo.save(function(err, data) {
  //     if (err) {
  //       console.log('did not save');
  //     }
  //   });
  // })
}

let findAllRepos = (callback) => {
  RepoModel.find({}).then((repos) => {
    callback(null, repos);
  });
  // should be equivalent to mongo shell command
  // db.repos.find({"owner_name": "iyyu"})
}

let findTopRepos = (callback) => {
  //finds freshes repos aka sorted by date
  RepoModel
  .find({})
  .sort('-updated_at')
  .limit(25)
  .then((sortedRepos) => {
    callback(null, sortedRepos);
  })
}

module.exports = {
  save,
  RepoModel,
  findAllRepos,
  findTopRepos
}