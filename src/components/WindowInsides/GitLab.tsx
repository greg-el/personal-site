import React from "react";
import GitLabRepo from "./GitLabRepo";

require("dotenv").config();

interface IProps {}

interface IState {
  repos: Array<GitLabData> | null;
  isLoaded: boolean;
}

interface GitLabData {
  id: number;
  name: string;
  url: string;
  description: string;
}

class GitLabEmbed extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      repos: null,
      isLoaded: false,
    };
  }

  async parseGitLabApiResult(result: any) {
    let output = [];
    for (let repo of result) {
      output.push({
        id: repo["id"],
        name: repo["name"],
        url: repo["web_url"],
        description: repo["description"],
      });
    }
    return output;
  }

  async componentDidMount() {
    if (!this.state.isLoaded) {
      fetch("https://gitlab.com/api/v4/users/greg-el/projects", {
        method: "GET",
        headers: new Headers({
          Authorization: `${process.env.REACT_APP_GITLAB_TOKEN}`,
        }),
      }).then((data) =>
        data.json().then(async (result) =>
          this.setState({
            repos: await this.parseGitLabApiResult(result),
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
            <div id="gitlab-header-icon" className="git-header-icon"></div>
          </div>
          <div className="git-header-label-wrapper">
            <div className="git-header-label" style={{ color: "#fc6d26" }}>
              GitLab
            </div>
          </div>
        </div>
        <div className="git-repos-container">
          {this.state.repos?.map((repo) => (
            <GitLabRepo data={repo} isLoaded={this.state.isLoaded} />
          ))}
        </div>
      </div>
    );
  }
}

export default GitLabEmbed;
