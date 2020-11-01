import React from "react";
import GitHubRepo from "./GitHubRepo";

require("dotenv").config();

interface IProps {}

interface IState {
  repos: Array<GitHubData> | null;
  isLoaded: boolean;
}

interface GitHubData {
  name: string;
  url: string;
  description: string;
  language: string;
}

class GitHubEmbed extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      repos: null,
      isLoaded: false,
    };
  }

  parseGitHubApiResult(result: any) {
    let output = [];
    for (let repo of result) {
      output.push({
        name: repo["name"],
        url: repo["html_url"],
        description: repo["description"],
        language: repo["language"],
      });
    }
    return output;
  }

  componentDidMount() {
    if (!this.state.isLoaded) {
      fetch("https://api.github.com/users/greg-el/repos", {
        method: "GET",
        headers: new Headers({
          Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
        }),
      }).then((_) =>
        _.json().then((result) =>
          this.setState({
            repos: this.parseGitHubApiResult(result),
            isLoaded: true,
          })
        )
      );
    }
  }

  render() {
    return (
      <div id="github-page-wrapper">
        <div id="github-header-wrapper">
          <div id="github-header-icon-wrapper">
            <div id="github-header-icon"></div>
          </div>
          <div id="github-header-label-wrapper">
            <div id="github-header-label">GitHub</div>
          </div>
        </div>
        <div id="github-repos-container">
          {this.state.repos?.map((repo) => (
            <GitHubRepo data={repo} />
          ))}
        </div>
      </div>
    );
  }
}

export default GitHubEmbed;
