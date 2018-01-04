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
  this.getTopRepos = this.getTopRepos.bind(this);
  }

  componentDidMount() {
    this.getRepos();
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      type: 'POST',
      url: 'http://127.0.0.1:1128/repos',
      data: JSON.stringify({username: term}),
      success: data => {
        console.log('success', data);
        this.getRepos();
      },
      error: error => {
        console.log('error', error);
      }
    })
  }
  
  getRepos() {
    // even though getRepos is bound to 'this' App component, the context of 'this' doesn't fall through in the setState after the axios.get
    var context = this;
    axios.get('/repos')
    .then((response) => {
      context.setState({repos: response.data});
    });
  }
  
  getTopRepos() {
    axios.get('/top')
    .then((response) => {
      this.setState({repos: response.data});
    })
  }
  
  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search}/>
      <RepoList repos={this.state.repos} key={this.state.repos.id} getRepos={this.getRepos} getTopRepos={this.getTopRepos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));