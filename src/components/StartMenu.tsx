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
        <div id="start-menu-wrapper">
          <div id={this.props.id}></div>
        </div>
      );
    } else {
      return "";
    }
  }
}

export default StartMenu;
