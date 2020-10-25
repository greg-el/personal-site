import React from "react";

interface IState {
  shutdownChoice: string | null;
}

interface IProps {}

class ShutDown extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = { shutdownChoice: null };
    this.handleChange = this.handleChange.bind(this);
    this.okButtonHandler = this.okButtonHandler.bind(this);
  }

  okButtonHandler() {
    if (this.state.shutdownChoice === "shutdown") {
      console.log("shutting down");
    } else if (this.state.shutdownChoice === "restart") {
      console.log("restarting");
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
      <div id="shut-down-container">
        <div id="shut-down-icon-wrapper">
          <div id="shut-down-icon"></div>
        </div>
        <div id="shut-down-main-container">
          <div id="shut-down-are-you-sure-wrapper">
            <div id="shut-down-are-you-sure"></div>
          </div>
          <form id="shut-down-choices-wrapper">
            <div className="shut-down-choice">
              <label>
                <input
                  type="radio"
                  value="shutdown"
                  name="shutdownChoice"
                  onChange={this.handleChange}
                />
                <u>S</u>hut down the computer?
              </label>
            </div>
            <div className="shut-down-choice">
              <label>
                <input
                  type="radio"
                  value="restart"
                  name="shutdownChoice"
                  onChange={this.handleChange}
                />
                <u>R</u>estart the computer?
              </label>
            </div>
          </form>
          <div id="shut-down-button-container">
            <div
              className="shut-down-button-wrapper"
              onClick={this.okButtonHandler}
            >
              <div id="shut-down-ok-button" className="shut-down-button">
                Ok
              </div>
            </div>
            <div className="shut-down-button-wrapper">
              <div id="shut-down-cancel-button" className="shut-down-button">
                Cancel
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShutDown;
