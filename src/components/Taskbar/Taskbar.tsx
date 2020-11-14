import React from "react";

interface IState {}

interface IProps {}

class Taskbar extends React.Component<IProps, IState> {
  render() {
    return <div id="taskbar">{this.props.children}</div>;
  }
}

export default Taskbar;
