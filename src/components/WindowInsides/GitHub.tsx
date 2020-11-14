import React from "react";
import GitHubRepo from "./GitHubRepo";

require("dotenv").config();

interface IProps {}

interface GitHubData {
  name: string;
  url: string;
  description: string;
}

interface IState {
  repos: Array<GitHubData> | null;
  isLoaded: boolean;
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
        _.json().then(async (result) =>
          this.setState({
            repos: await this.parseGitHubApiResult(result),
            isLoaded: true,
          })
        )
      );
    }
  }

  render() {
    return (
      <div className="git-page-wrapper">
        <div className="git-header-wrapper">
          <div className="git-header-icon-wrapper">
            <div id="github-header-icon" className="git-header-icon"></div>
          </div>
          <div className="git-header-label-wrapper">
            <div className="git-header-label">GitHub</div>
          </div>
        </div>
        <div className="git-repos-container">
          {this.state.repos?.map((repoData) => (
            <GitHubRepo data={repoData} isLoaded={this.state.isLoaded} />
          ))}
        </div>
      </div>
    );
  }
}

export default GitHubEmbed;
