import React, { ReactElement } from "react";
import { WindowStateEnum } from "../constants/index";

interface IProps {
  focused: boolean;
  state: WindowStateEnum;
  label: string;
  icon?: ReactElement;
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
}

interface IState {}

class TaskbarWindow extends React.Component<IProps, IState> {
  render() {
    if (this.props.state !== WindowStateEnum.CLOSED) {
      let style =
        this.props.state === WindowStateEnum.OPEN
          ? "taskbar-window-open"
          : "taskbar-window-minimised";
      return (
        <div className="taskbar-window-wrapper"onClick={() =>
          this.props.setWindowState(
            this.props.taskbarStateName,
            this.props.windowStateName,
            WindowStateEnum.OPEN
          )
        }>
          <div className={"taskbar-window" + " " + style}>
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
