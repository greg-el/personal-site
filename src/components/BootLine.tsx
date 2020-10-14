import React from "react";

interface BootLineProps {
  waitTime: number;
  text: string;
}

interface BootLineState {
  hidden: boolean;
}

class BootLine extends React.Component<BootLineProps, BootLineState> {
  constructor(props: BootLineProps) {
    super(props);
    this.state = {
      hidden: true,
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ hidden: false }), this.props.waitTime);
  }

  render() {
    if (this.state.hidden === true) {
      return "";
    } else {
      return (
        <div className="bootLine">
          <div className="bootText">{this.props.text}</div>
        </div>
      );
    }
  }
}

export default BootLine;
