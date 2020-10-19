import React from "react";
import { WindowStateEnum } from "../constants";

interface IProps {
  image: React.CSSProperties;
  label: string;
  setWindowState: Function;
}

interface IState {
  windowExists: boolean;
}

class StartMenuItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { windowExists: false };
  }

  render() {
    return (
      <div
        onClick={() => this.props.setWindowState(WindowStateEnum.OPEN)}
        className="start-menu-item-wrapper"
      >
        <div className="start-menu-item">
          <div style={this.props.image} className="start-menu-item-image"></div>
          <div className="start-menu-item-label">{this.props.label}</div>
        </div>
      </div>
    );
  }
}

export default StartMenuItem;
