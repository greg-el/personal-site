import React from "react";
import { WindowStateEnum } from "../../constants/index";

interface IProps {
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
}

interface IState {}

class Close extends React.Component<IProps, IState> {
  render() {
    return (
      <div
        onClick={() =>
          this.props.setWindowState(
            this.props.taskbarStateName,
            this.props.windowStateName,
            WindowStateEnum.CLOSED
          )
        }
        className="window-control-wrapper window-close-wrapper"
      >
        <button className="window-control window-close"></button>
      </div>
    );
  }
}

export default Close;
