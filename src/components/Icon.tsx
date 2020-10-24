import React from "react";
import Draggable from "react-draggable";
import onClickOutside from "react-onclickoutside";

interface IState {
  focused: boolean;
}

interface IProps {
  iconStyle: React.CSSProperties;
  label: string;
  url: string;
  id: string;
}

class Icon extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  handleClickOutside() {
    this.setState({ focused: false });
  }

  handleClick() {
    this.setState({ focused: true });
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
          onClick={() => this.handleClick()}
        >
          <div className="icon" style={this.props.iconStyle}></div>
          <div className="icon-label">{this.props.label}</div>
        </div>
      </Draggable>
    );
  }
}

export default onClickOutside(Icon);
