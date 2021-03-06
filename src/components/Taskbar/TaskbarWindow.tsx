import React from "react";
import { WindowStateEnum } from "../../constants/index";

interface IProps {
  id: string;
  state: WindowStateEnum;
  label: string;
  icon?: React.CSSProperties;
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
  getTopWindowId: Function;
  moveToFront: Function;
  order: Function;
}

interface IState {}

class TaskbarWindow extends React.Component<IProps, IState> {
  render() {
    if (this.props.state !== WindowStateEnum.CLOSED) {
      let style =
        this.props.id === this.props.getTopWindowId() &&
        this.props.state === WindowStateEnum.OPEN
          ? "taskbar-window-open"
          : "taskbar-window-minimised";
      return (
        <div
          style={{ order: this.props.order(this.props.id) }}
          className="taskbar-window-wrapper"
          onClick={() => {
            this.props.moveToFront(this.props.id);
            this.props.setWindowState(
              this.props.taskbarStateName,
              this.props.windowStateName,
              WindowStateEnum.OPEN
            );
          }}
        >
          <div className={"taskbar-window " + style}>
            <div className="taskbar-window-icon-wrapper">
              <div
                className="taskbar-window-icon"
                style={this.props.icon}
              ></div>
            </div>
            <div className="taskbar-window-label-wrapper">
              <div className="taskbar-window-label">{this.props.label}</div>
            </div>
          </div>
        </div>
      );
    } else if (this.props.state === WindowStateEnum.CLOSED) {
      return "";
    }
  }
}

export default TaskbarWindow;
