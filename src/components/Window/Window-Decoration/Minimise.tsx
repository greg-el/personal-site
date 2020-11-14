import React from "react";
import { WindowStateEnum } from "../../../constants/index";

interface IProps {
  setWindowState: Function;
  windowStateName: string;
  taskbarStateName: string;
}

interface IState {}

class Minimise extends React.Component<IProps, IState> {
  render() {
    return (
      <div
        onClick={() =>
          this.props.setWindowState(
            this.props.taskbarStateName,
            this.props.windowStateName,
            WindowStateEnum.MINIMISED
          )
        }
        className="window-control-wrapper window-min-wrapper"
      >
        <div className="window-control window-min"></div>
      </div>
    );
  }
}

export default Minimise;
