import React from "react";

interface IState {}

interface IProps {
  style: React.CSSProperties;
  label: string;
}

class Icon extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="icon-wrapper">
        <div className="icon" style={this.props.style}></div>
        <div className="icon-label">{this.props.label}</div>
      </div>
    );
  }
}

export default Icon;
