import React from "react";
import Icon from "./Icon";
import { ReactComponent as GitLabIcon } from "../image/GitLabLogo.svg";

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
          <Icon style={{ backgroundImage: `url(${GitLabIcon})` }} />
        </div>
      </div>
    );
  }
}

export default Desktop;
