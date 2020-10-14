import React from "react";

interface IState {}

interface IProps {
  focusedElement: any;
  setFocusedElement: any;
}

class Taskbar extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div
        id="taskbar"
        onClick={(e) => this.props.setFocusedElement(e.currentTarget)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Taskbar;
