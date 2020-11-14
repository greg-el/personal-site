import React from "react";
import Draggable from "react-draggable";
import onClickOutside from "react-onclickoutside";
import { WindowStateEnum } from "../../constants";

interface IState {
  focused: boolean;
}

interface IProps {
  iconStyle: React.CSSProperties;
  label: string;
  url: string;
  id: string;
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
  addToStack: Function;
  removeFromStack: Function;
  moveToFront: Function;
  addToTaskbarStack: Function;
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
          onClick={() => this.handleClick()}
          onDoubleClick={() => {
            this.props.addToStack(this.props.id);
            this.props.addToTaskbarStack(this.props.id);
            this.props.setWindowState(
              this.props.taskbarStateName,
              this.props.windowStateName,
              WindowStateEnum.OPEN
            );
            //window.open(this.props.url, "_blank")}
          }}
        >
          <div className="icon" style={this.props.iconStyle}></div>
          <div className="icon-label">{this.props.label}</div>
        </div>
      </Draggable>
    );
  }
}

export default onClickOutside(Icon);
