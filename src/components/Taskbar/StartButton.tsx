import React from "react";
import onClickOutside from "react-onclickoutside";

interface IState {}

interface IProps {
  isStartMenuOpen: boolean;
  setStartMenuOpen: Function;
  setStartMenuClosed: Function;
  outsideClickIgnoreClass: String;
}

class StartButton extends React.Component<IProps, IState> {
  handleClickOutside() {
    this.props.setStartMenuClosed();
  }

  render() {
    let buttonClass = "start-button-unfocused";
    let logoOutline = {};
    if (this.props.isStartMenuOpen) {
      buttonClass = "start-button-focused";
      logoOutline = { outline: "1px dotted black" };
    }
    return (
      <div
        id="start-button-wrapper"
        onClick={() => this.props.setStartMenuOpen()}
      >
        <div id="start-button" className={buttonClass}>
          <div id="start-button-logo-container" style={logoOutline}>
            <div id="start-button-icon-wrapper">
              <div id="start-button-icon"></div>
            </div>
            <div id="start-button-label-wrapper">
              <div id="start-button-label">Start</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default onClickOutside(StartButton);
