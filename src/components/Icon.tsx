import React from "react";

interface IState {}

interface IProps {
  style: React.CSSProperties;
}

class Icon extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div className="icon-wrapper">
        <div className="icon" style={this.props.style}></div>
      </div>
    );
  }
}

export default Icon;
