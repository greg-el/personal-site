import React from "react";

interface IState {}

interface IProps {}

class Desktop extends React.Component<IProps, IState> {
  render() {
    return (
      <div id="desktop-wrapper">
        <div id="desktop">{this.props.children}</div>
      </div>
    );
  }
}

export default Desktop;
