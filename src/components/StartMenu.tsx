import React from "react";

interface IState {}

interface IProps {
  isStartMenuOpen: boolean;
}

class StartMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {};
  }

  render() {
    if (this.props.isStartMenuOpen === true) {
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
