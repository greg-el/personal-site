import React, { ReactElement } from "react";
import { WindowStateEnum } from "../constants";

interface IProps {
  id: string;
  image: React.CSSProperties;
  label: string;
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
  addToStack: Function;
  removeFromStack: Function;
  moveToFront: Function;
  addToTaskbarStack: Function;
  setMenuClosed: Function;
  style?: React.CSSProperties;
}

interface IState {
  windowExists: boolean;
  underlinedLabel: ReactElement;
}

class StartMenuItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      windowExists: false,
      underlinedLabel: this.underlineFirstLetter(),
    };
  }

  underlineFirstLetter() {
    return (
      <span>
        <u>{this.props.label.slice(0, 1)}</u>
        {this.props.label.slice(1)}
      </span>
    );
  }

  render() {
    return (
      <div
        style={this.props.style}
        onClick={() => {
          this.props.addToStack(this.props.id);
          this.props.addToTaskbarStack(this.props.id);
          this.props.setWindowState(
            this.props.taskbarStateName,
            this.props.windowStateName,
            WindowStateEnum.OPEN
          );
          this.props.setMenuClosed();
        }}
        className="start-menu-item-wrapper"
      >
        <div className="start-menu-item">
          <div style={this.props.image} className="start-menu-item-image"></div>
          <div className="start-menu-item-label">
            {this.state.underlinedLabel}
          </div>
        </div>
      </div>
    );
  }
}

export default StartMenuItem;
