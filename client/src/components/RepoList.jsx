import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos. 
    <button onClick={props.getRepos}>Get All</button>
    <button onClick={props.getTopRepos}>Get Top</button>
  </div>
)

export default RepoList;