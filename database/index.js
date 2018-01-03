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
    console.log(repo.description);

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
  // console.log(RepoModel.find({}));
  // var findCursor = RepoModel.find({}).cursor();
  // findCursor.next((err, repo) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   callback(null, repo);
  // });
  RepoModel.find({}).then((repos) => {
    // if (err) {
    //   console.log('ERROR', err);
    // }
    // repos.forEach((repo) => {
    //   console.log('each repo', repo);
    //   callback(null, repo)
    // });
    callback(null, repos);
  });
  // should be equivalent to mongo shell command
  // db.repos.find({"owner_name": "iyyu"})
}

module.exports = {
  save,
  findAllRepos
}