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
        ? "start-clicked"
        : "start-not-clicked";
    return (
      <div id="start-button-wrapper">
        <button
          id={this.props.id}
          onClick={(e) => this._handleSingleClick(e)}
          className={buttonClass}
        >
          <div id="start-label"></div>
          Start
        </button>
      </div>
    );
  }
}

export default StartButton;
