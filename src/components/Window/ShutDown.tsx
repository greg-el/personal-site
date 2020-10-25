import React from "react";

interface IState {
  shutdownChoice: string;
}

interface IProps {
  shutDownSystem: Function

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
      this.props.shutDownSystem();
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
            <div id="shut-down-are-you-sure">Are you sure you want to:</div>
          </div>
          <form id="shut-down-choices-wrapper">
            <div className="shut-down-choice">
              <label>
                <input
                  type="radio"
                  value="shutdown"
                  name="shutdownChoice"
                  checked={true}
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
                Yes
              </div>
            </div>
            <div className="shut-down-button-wrapper">
              <div id="shut-down-cancel-button" className="shut-down-button">
                No
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShutDown;
