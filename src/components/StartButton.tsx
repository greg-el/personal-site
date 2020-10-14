import React from "react";

interface IState {}

interface IProps {
  startMouseDown: boolean;
  startMouseUp: boolean;
  onMouseDown: any;
  onMouseUp: any;
}

class StartButton extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    let buttonClass =
      this.props.startMouseDown === true
        ? "start-clicked"
        : "start-not-clicked";
    return (
      <div id="start-button-wrapper">
        <button
          id="start-button"
          onMouseDown={() => this.props.onMouseDown()}
          onMouseUp={() => this.props.onMouseUp()}
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
