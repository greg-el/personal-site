import React from "react";

interface IState {}

interface IProps {
  startMenuOpen: boolean;
}

class StartMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  render() {
    if (this.props.startMenuOpen === true) {
      return (
        <div id="start-menu-wrapper">
          <div id="start-menu-panel-container">
            <div id="start-menu-logo-wrapper">
              <div id="start-menu-logo"></div>
            </div>
            <div id="start-menu">{this.props.children}</div>
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
}

export default StartMenu;
