import React, { ReactElement } from "react";
import { WindowStateEnum } from "../constants";
import { GlobalHotKeys } from "react-hotkeys";

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
  keymap: any;
  handler: any;
}

class StartMenuItem extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      windowExists: false,
      keymap: {
        [this.props.id + "Open"]: this.props.hotkey,
      },
      handler: {
        [this.props.id + "Open"]: () => this.openWindow(),
      },
    };
    this.openWindow = this.openWindow.bind(this);
  }

  openWindow() {
    this.props.addToStack(this.props.id);
    this.props.addToTaskbarStack(this.props.id);
    this.props.setWindowState(
      this.props.taskbarStateName,
      this.props.windowStateName,
      WindowStateEnum.OPEN
    );
    this.props.setMenuClosed();
  }

  render() {
    return (
      <GlobalHotKeys
        allowChanges={true}
        keyMap={this.state.keymap}
        handlers={this.state.handler}
      >
        <div
          style={this.props.style}
          tabIndex={0}
          onKeyDown={(e) => {
            console.log(e);
          }}
          onClick={() => this.openWindow()}
          className="start-menu-item-wrapper"
        >
          <div className="start-menu-item">
            <div
              style={this.props.image}
              className="start-menu-item-image"
            ></div>
            {this.props.label}
          </div>
        </div>
      </GlobalHotKeys>
    );
  }
}

export default StartMenuItem;
