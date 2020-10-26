import React from "react";
import {
  ScreenStateEnum,
  CursorStateEnum,
  WindowStateEnum,
} from "../../constants/index";

interface IState {
  shutdownChoice: string;
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

    this.state = { shutdownChoice: "shutdown" };
    this.handleChange = this.handleChange.bind(this);
    this.okButtonHandler = this.okButtonHandler.bind(this);
  }

  okButtonHandler() {
    if (this.state.shutdownChoice === "shutdown") {
      this.props.setCursor(CursorStateEnum.LOADING);
      setTimeout(
        () => this.props.setScreenState(ScreenStateEnum.LOGOSHUTDOWN),
        2000
      );
      setTimeout(
        () => this.props.setScreenState(ScreenStateEnum.SHUTDOWN),
        8000
      );
    } else if (this.state.shutdownChoice === "restart") {
      setTimeout(
        () => this.props.setScreenState(ScreenStateEnum.RESTART),
        1000
      );
    }
  }

  handleChange(e: any) {
    let { value } = e.target;
    this.setState({
      shutdownChoice: value,
    });
  }

  render() {
    return (
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
                <label className="container">
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
                <label className="container">
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
                this.props.removeWindowFromStack(this.props.id);
                this.props.removeFromTaskbarStack(this.props.id);
                this.props.setWindowState(
                  this.props.taskbarStateName,
                  this.props.windowStateName,
                  WindowStateEnum.CLOSED
                );
              }}
            >
              <div id="shut-down-ok-button" className="shut-down-button">
                <u>Y</u>es
              </div>
            </div>
            <div className="shut-down-button-wrapper">
              <div id="shut-down-cancel-button" className="shut-down-button">
                <u>N</u>o
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShutDown;
