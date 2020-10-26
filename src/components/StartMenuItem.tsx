import React, { ReactElement } from "react";
import { WindowStateEnum } from "../constants";

interface IProps {
  id: string;
  image: React.CSSProperties;
  label: ReactElement;
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
  addToStack: Function;
  removeFromStack: Function;
  moveToFront: Function;
  addToTaskbarStack: Function;
  setMenuClosed: Function;
  style?: React.CSSProperties;
  hotkey: string;
  isStartMenuOpen: boolean;
}

interface IState {
  windowExists: boolean;
  startMenuOpen: boolean;
}

class StartMenuItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      windowExists: false,
      startMenuOpen: true,
    };
  }

  openWindow() {
    if (this.state.startMenuOpen === true) {
      this.props.addToStack(this.props.id);
      this.props.addToTaskbarStack(this.props.id);
      this.props.setWindowState(
        this.props.taskbarStateName,
        this.props.windowStateName,
        WindowStateEnum.OPEN
      );
      this.props.setMenuClosed();
    }
  }

  isWindowHotkey(e: KeyboardEvent) {
    return e.key === this.props.hotkey;
  }

  componentDidMount() {
    // Hacky workaround for keydown detection to get around focus issues
    document.addEventListener("keydown", (e) => {
      if (this.isWindowHotkey(e)) {
        this.openWindow();
      }
    });
  }

  render() {
    return (
      <div
        style={this.props.style}
        tabIndex={0}
        onKeyDown={(e) => {
          console.log(e);
        }}
        onClick={this.openWindow}
        className="start-menu-item-wrapper"
      >
        <div className="start-menu-item">
          <div style={this.props.image} className="start-menu-item-image"></div>
          {this.props.label}
        </div>
      </div>
    );
  }
}

export default StartMenuItem;
