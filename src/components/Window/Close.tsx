import React from "react";
import { WindowStateEnum } from "../../constants/index";

interface IProps {
  id: string;
  setWindowState: Function;
}

interface IState {}

class Close extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div
        onClick={() =>
          this.props.setWindowState(this.props.id, WindowStateEnum.CLOSED)
        }
        className="window-control-wrapper window-close-wrapper"
      >
        <button className="window-control window-close"></button>
      </div>
    );
  }
}

export default Close;
