import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    There are {props.repos.length} repos. 
    <button onClick={props.getRepos}>Get All</button>
    <button onClick={props.getTopRepos}>Get Newest</button>

    <table>
      <tbody>
        <tr>
          <th>Repo Owner</th>
          <th>Repo Name</th>
          <th>Repo Link</th>
          <th>Repo Description</th>
          <th>Repo Last Updated</th>
        </tr>
        {props.repos.map((repo) => 
          <tr key={repo.repo_id}>
            <th>{repo.owner_name}</th>
            <th>{repo.repo_name}</th>
            <th>{repo.repo_url}</th>
            <th>{repo.description}</th>
            <th>{repo.updated_at}</th>
          </tr>
        )}
      </tbody>
    </table>
  </div>
)

export default RepoList;