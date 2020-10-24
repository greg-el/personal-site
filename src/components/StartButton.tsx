import React, { SyntheticEvent } from "react";

interface IState {}

interface IProps {
  focusedElement: any;
  setFocusedElement: any;
  id: string;
}

class StartButton extends React.Component<IProps, IState> {
  _handleSingleClick(event: SyntheticEvent) {
    let target = event.currentTarget;
    this.props.setFocusedElement(target);
    event.stopPropagation();
    this.setState({
      focused: true,
    });
  }

  render() {
    let buttonClass =
      this.props.focusedElement === this.props.id
        ? "start-button-focused"
        : "start-button-unfocused";
    return (
      <div id="start-button-wrapper">
        <div
          id="start-button"
          className={buttonClass}
          onClick={(e) => this._handleSingleClick(e)}
        >
          <div id="start-button-icon-wrapper">
            <div id="start-button-icon"></div>
          </div>
          <div id="start-button-label-wrapper">
            <div id="start-button-label">Start</div>
          </div>
        </div>
      </div>
    );
  }
}

export default StartButton;
