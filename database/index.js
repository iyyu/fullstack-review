const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Connected to Mongo');
});

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  id: Number,
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
  // This function should save a repo or repos to
  // the MongoDB
  repoArr.map((repo) => {
    let eachRepo = new RepoModel({
      repo_name: `${repo.name}`,
      repo_url: `${repo.html_url}`,
      owner_name: `${repo.owner.login}`,
      description: `${repo.description}` || 'no description available',
      updated_at: `${repo.updated_at}`
    });
    eachRepo.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  })
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
  findAllRepos,
  findTopRepos
}