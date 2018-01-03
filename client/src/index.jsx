import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import axios from 'axios';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  this.search = this.search.bind(this);
  this.getRepos = this.getRepos.bind(this);
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:1128/repos',
      data: JSON.stringify({username: term}),
      dataType: 'json',
      success: function(data) {
        console.log('success', data);
      }
    })
    // axios.post('/repos', {username: term})
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // })
    // this.getRepos();
  }
  
  getRepos() {
    axios.get('/repos')
    .then((response) => {
      this.setState({repos: response.data});
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));