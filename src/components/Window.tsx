import React, { ReactElement } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { WindowStateEnum } from "../constants/index";

interface IProps {
  name: string;
  titlebarIcon?: ReactElement;
  titlebarLabel: ReactElement;
  close: ReactElement;
  minimise?: ReactElement;
  maximise?: React.Component;
  toolbar?: React.Component;
  fileContainer?: React.Component;
  detailsPane?: React.Component;
  windowState: WindowStateEnum;
}

interface IState {
  focused: boolean;
}

class Window extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      focused: true,
    };
  }

  render() {
    if (this.props.windowState === WindowStateEnum.OPEN) {
      return (
        <Draggable handle=".window-title-bar-draggable" bounds="#desktop">
          <ResizableBox
            className="window-wrapper"
            width={300}
            height={300}
            handle={(h) => <span className={"resize-handle"} />}
            handleSize={[35, 35]}
            minConstraints={[300, 300]}
            resizeHandles={["se"]}
          >
            <div id={this.props.name} className="window">
              <div className="window-resize-handle"></div>
              <div className="window-title-bar-container">
                <div className="title-bar">
                  <div className="window-title-bar-draggable">
                    {this.props.titlebarIcon}
                    {this.props.titlebarLabel}
                  </div>
                  <div className="window-controls-container">
                    {this.props.minimise}
                    {this.props.maximise}
                    {this.props.close}
                  </div>
                </div>
              </div>
              {this.props.toolbar}
              {this.props.fileContainer}
              {this.props.detailsPane}
            </div>
          </ResizableBox>
        </Draggable>
      );
    } else if (
      this.props.windowState === WindowStateEnum.CLOSED ||
      this.props.windowState === WindowStateEnum.MINIMISED
    ) {
      return "";
    }
  }
}

export default Window;
