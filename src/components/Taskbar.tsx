import React from "react";

interface IState {}

interface IProps {
  focusedElement: any;
  setFocusedElement: any;
  id: string;
}

class Taskbar extends React.Component<IProps, IState> {
  render() {
    return (
      <div
        id={this.props.id}
        onClick={(e) => this.props.setFocusedElement(e.currentTarget)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Taskbar;
