import React from "react";
import { WindowStateEnum } from "../../constants/index";

interface IProps {
  id: string;
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
  removeWindowFromStack: Function;
  removeFromTaskbarStack: Function;
}

interface IState {}

class Close extends React.Component<IProps, IState> {
  render() {
    return (
      <div
        onClick={() => {
          this.props.removeWindowFromStack(this.props.id);
          this.props.removeFromTaskbarStack(this.props.id);
          this.props.setWindowState(
            this.props.taskbarStateName,
            this.props.windowStateName,
            WindowStateEnum.CLOSED
          );
        }}
        className="window-control-wrapper window-close-wrapper"
      >
        <div className="window-control window-close"></div>
      </div>
    );
  }
}

export default Close;
