import React, { SyntheticEvent } from "react";
import Draggable from "react-draggable";

interface IState {
  focused: boolean;
}

interface IProps {
  iconStyle: React.CSSProperties;
  label: string;
  url: string;
  id: string;
  focusedElement: any;
  setFocusedElement: any;
}

class Icon extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      focused: false,
    };
    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
  }

  componentDidUpdate() {
    if (
      this.props.focusedElement !== this.props.id &&
      this.state.focused === true
    ) {
      this.setState({
        focused: false,
      });
    }
  }

  onMouseDown(event: SyntheticEvent) {
    this.props.setFocusedElement(event.currentTarget);
  }

  onMouseUp(event: SyntheticEvent) {
    this.setState({ focused: false });
  }

  render() {
    let setClassName =
      this.state.focused === true ? "icon-focused" : "icon-not-focused";
    return (
      <Draggable bounds="parent">
        <div
          id={this.props.id}
          className={"icon-wrapper " + setClassName}
          onDoubleClick={() => window.open(this.props.url, "_blank")}
          onMouseDown={(e) => this.onMouseDown(e)}
          onMouseUp={(e) => this.onMouseUp(e)}
        >
          <div className="icon" style={this.props.iconStyle}></div>
          <div className="icon-label">{this.props.label}</div>
        </div>
      </Draggable>
    );
  }
}

export default Icon;
