import React from "react";

interface IProps {
  data: any;
}

interface IState {}

class GitHubRepo extends React.Component<IProps, IState> {
  render() {
    return (
      <div className="repo-wrapper">
        <div className="repo-title-wrapper">
          <div className="repo-title-logo-wrapper">
            <div className="repo-title-logo">{this.props.data.name}</div>
          </div>
          <div className="repo-title-label-wrapper">
            <div className="repo-title-label"></div>
          </div>
        </div>
        <div className="repo-description-wrapper">
          <div className="repo-description">{this.props.data.description}</div>
        </div>
        <div className="repo-language-wrapper">
          <div className="repo-language-icon-wrapper">
            <div className="repo-language-icon"></div>
          </div>
          <div className="repo-language-label-wrapper">
            <div className="repo-language-label">
              {this.props.data.language}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default GitHubRepo;
