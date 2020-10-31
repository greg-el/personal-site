import React from "react";
import {
  ScreenStateEnum,
  CursorStateEnum,
  WindowStateEnum,
} from "../../constants/index";
import { GlobalHotKeys } from "react-hotkeys";

interface IState {
  shutdownChoice: string;
  keymap: any;
  handler: any;
  shutdownOptionRef: any;
  restartOptionRef: any;
}

interface IProps {
  id: string;
  setScreenState: Function;
  setCursor: Function;
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
  removeWindowFromStack: Function;
  removeFromTaskbarStack: Function;
}

class ShutDown extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      shutdownChoice: "shutdown",
      keymap: {
        YES: "y",
        NO: "n",
        SHUTDOWNOPTION: "s",
        RESTARTOPTION: "r",
      },
      handler: {
        YES: () => {
          this.okButtonHandler();
          this.closeWindow();
        },
        NO: () => this.closeWindow(),
        // Hacky detection for restart and shutdown radio buttons
        SHUTDOWNOPTION: () =>
          document.getElementById("shut-down-choice-shutdown")?.click(),
        RESTARTOPTION: () =>
          document.getElementById("shut-down-choice-restart")?.click(),
      },
      shutdownOptionRef: React.createRef(),
      restartOptionRef: React.createRef(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.okButtonHandler = this.okButtonHandler.bind(this);
    this.closeWindow = this.closeWindow.bind(this);
  }

  okButtonHandler() {
    this.props.setCursor(CursorStateEnum.LOADING);
    setTimeout(() => {
      this.props.setScreenState(ScreenStateEnum.LOGOSHUTDOWN);
    }, 2000);
    if (this.state.shutdownChoice === "shutdown") {
      setTimeout(
        () => this.props.setScreenState(ScreenStateEnum.SHUTDOWN),
        8000
      );
    } else if (this.state.shutdownChoice === "restart") {
      setTimeout(
        () => this.props.setScreenState(ScreenStateEnum.DESKTOP),
        8000
      );
    }
  }

  handleChange(e: any) {
    console.log(e);
    let { value } = e.target;
    this.setState({
      shutdownChoice: value,
    });
  }

  closeWindow() {
    this.props.removeWindowFromStack(this.props.id);
    this.props.removeFromTaskbarStack(this.props.id);
    this.props.setWindowState(
      this.props.taskbarStateName,
      this.props.windowStateName,
      WindowStateEnum.CLOSED
    );
  }

  render() {
    return (
      <GlobalHotKeys keyMap={this.state.keymap} handlers={this.state.handler}>
        <div id="shut-down-window-container">
          <div id="shut-down-icon-wrapper">
            <div id="shut-down-icon"></div>
          </div>
          <div id="shut-down-main-container">
            <div id="shut-down-are-you-sure-wrapper">
              <div id="shut-down-are-you-sure">Are you sure you want to:</div>
            </div>
            <form id="shut-down-choices-container">
              <div className="shut-down-choice-wrapper">
                <div className="shut-down-choice">
                  <label className="container" id="shut-down-choice-shutdown">
                    <input
                      type="radio"
                      value="shutdown"
                      name="shutdownChoice"
                      onChange={this.handleChange}
                      checked={this.state.shutdownChoice === "shutdown"}
                    />
                    <span className="checkmark"></span>
                    <div className="shut-down-choice-label">
                      <u>S</u>hut down the computer?
                    </div>
                  </label>
                </div>
              </div>
              <div className="shut-down-choice-wrapper">
                <div className="shut-down-choice">
                  <label className="container" id="shut-down-choice-restart">
                    <input
                      type="radio"
                      value="restart"
                      name="shutdownChoice"
                      onChange={this.handleChange}
                      checked={this.state.shutdownChoice === "restart"}
                    />
                    <span className="checkmark"></span>
                    <u>R</u>estart the computer?
                  </label>
                </div>
              </div>
            </form>
            <div id="shut-down-button-container">
              <div
                className="shut-down-button-wrapper"
                onClick={() => {
                  this.okButtonHandler();
                  this.closeWindow();
                }}
              >
                <div id="shut-down-yes-button" className="shut-down-button">
                  <u>Y</u>es
                </div>
              </div>
              <div
                className="shut-down-button-wrapper"
                onClick={this.closeWindow}
              >
                <div id="shut-down-no-button" className="shut-down-button">
                  <u>N</u>o
                </div>
              </div>
            </div>
          </div>
        </div>
      </GlobalHotKeys>
    );
  }
}

export default ShutDown;
