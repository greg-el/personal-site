import React from "react";

interface IState {
  focusedElement: any;
}

interface IProps {
  setFocusedElement: any;
  focusedElement: any;
  id: string;
}

class Desktop extends React.Component<IProps, IState> {

  render() {
    return (
      <div id="desktop-wrapper">
        <div
          id={this.props.id}
          onClick={(e) => this.props.setFocusedElement(e.currentTarget)}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Desktop;
