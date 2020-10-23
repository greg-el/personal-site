import React, { ReactElement } from "react";
import { WindowStateEnum } from "../constants/index";

interface IProps {
  id: string;
  focusedElement: string;
  state: WindowStateEnum;
  label: string;
  icon?: ReactElement;
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
  getTopWindowId: Function;
  moveToFront: Function;
}

interface IState {}

class TaskbarWindow extends React.Component<IProps, IState> {
  render() {
    if (this.props.state !== WindowStateEnum.CLOSED) {
      let style =
        this.props.id === this.props.getTopWindowId() &&
        this.props.state === WindowStateEnum.OPEN &&
        this.props.focusedElement !== "desktop"
          ? "taskbar-window-open"
          : "taskbar-window-minimised";
      return (
        <div
          className="taskbar-window-wrapper"
          onClick={() => {
            if (this.props.state === WindowStateEnum.MINIMISED) {
              this.props.moveToFront(this.props.id);
            }
            this.props.setWindowState(
              this.props.taskbarStateName,
              this.props.windowStateName,
              WindowStateEnum.OPEN
            );
          }}
        >
          <div className={"taskbar-window " + style}>
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
