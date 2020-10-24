import React from "react";

interface IState {
  focused: boolean;
}

interface IProps {
  focusedElement: any;
  setFocusedElement: any;
  id: string;
}

class StartMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  componentDidUpdate() {
    if (
      this.state.focused === false &&
      this.props.focusedElement === "start-button"
    ) {
      this.setState({
        focused: true,
      });
    } else if (
      this.state.focused === true &&
      this.props.focusedElement !== "start-button"
    ) {
      this.setState({
        focused: false,
      });
    }
  }

  render() {
    if (this.state.focused === true) {
      return (
        <div
          id="start-menu-wrapper"
          onClick={(e) => this.props.setFocusedElement(e.currentTarget)}
        >
          <div id="start-menu-panel-container">
            <div id="start-menu-logo-wrapper">
              <div id="start-menu-logo"></div>
            </div>
            <div id={this.props.id}>{this.props.children}</div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
}

export default StartMenu;
