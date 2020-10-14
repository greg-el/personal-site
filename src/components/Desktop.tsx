import React from "react";
import Icon from "./Icon";
import GitLabLogo from "../image/GitLabLogoPixelShortcut.png"
import GitHubLogo from "../image/GitHubLogoPixelShortcut.png"

interface IState {}

interface IProps {
  desktopMouseDown: boolean;
  onDesktopMouseDown: any;
  desktopMouseUp: boolean;
  onDesktopMouseUp: any;
}

class Desktop extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div id="desktop-wrapper">
        <div
          id="desktop"
          onMouseDown={this.props.onDesktopMouseDown}
          onMouseUp={this.props.onDesktopMouseUp}
        >
          <Icon style={{ backgroundImage: `url( ${GitLabLogo})` }} label="GitLab" />
          <Icon style={{ backgroundImage: `url( ${GitHubLogo})` }} label="GitHub"/>
        </div>
      </div>
    );
  }
}

export default Desktop;
