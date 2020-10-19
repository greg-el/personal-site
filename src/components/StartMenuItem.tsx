import React from "react";

interface IProps {
  onClickHandler: Function;
  image: React.CSSProperties;
  label: string;
}

interface IState {}

class StartMenuItem extends React.Component<IProps, IState> {
  render() {
    return (
      <div
        onClick={() => this.props.onClickHandler(this.props.label)}
        className="start-menu-item-wrapper"
      >
        <div className="start-menu-item">
          <div style={this.props.image} className="start-menu-item-image"></div>
          <div className="start-menu-item-label">{this.props.label}</div>
        </div>
      </div>
    );
  }
}

export default StartMenuItem;
