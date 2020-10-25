import React, { ReactElement } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { WindowStateEnum } from "../constants/index";

interface IProps {
  name: string;
  id: string;
  titlebarIcon?: ReactElement;
  titlebarLabel: ReactElement;
  close: ReactElement;
  minimise?: ReactElement;
  maximise?: ReactElement;
  toolbar?: ReactElement;
  fileContainer?: ReactElement;
  detailsPane?: ReactElement;
  insideElement?: ReactElement;
  windowState: WindowStateEnum;
  moveToFront: Function;
  zIndex: number;
  windowStackLength: number;
  resize: boolean;
  size?: [number, number];
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
    if (this.props.windowState !== WindowStateEnum.CLOSED) {
      let windowClass =
        this.props.windowState === WindowStateEnum.OPEN
          ? "window-open"
          : "window-minimised";

      let focusedClass =
        this.props.zIndex === this.props.windowStackLength - 1
          ? "title-bar-focused"
          : "title-bar-unfocused";



      let [width, height] = this.props.size ? this.props.size : [700, 650];


      let resizeHandle = <div></div>;
      let handleElement = <span></span>;
      if (this.props.resize === true) {
        handleElement = <span className={"resize-handle"} />;
        resizeHandle = <div className="window-resize-handle"></div>;
      }

      return (
        <Draggable
          handle=".window-title-bar-draggable"
          bounds="#desktop"
          onDrag={() => {
            this.props.moveToFront();
          }}
        >
          <ResizableBox
            {...{
              width: width,
              height: height,
              handleSize: [35, 35],
              minConstraints: [700, 650],
              resizeHandles: ["se"],
              className: "window-wrapper " + windowClass,
              style: { zIndex: this.props.zIndex },
              handle: (h: any) => handleElement,
            }}
          >
            <div
              id={this.props.name}
              className="window"
              onMouseDown={(e) => {
                this.props.moveToFront();
              }}
            >
              {resizeHandle}
              <div className="window-title-bar-container">
                <div className={"title-bar " + focusedClass}>
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
              {this.props.insideElement}
              {this.props.toolbar}
              {this.props.fileContainer}
              {this.props.detailsPane}
            </div>
          </ResizableBox>
        </Draggable>
      );
    } else if (this.props.windowState === WindowStateEnum.CLOSED) {
      return "";
    }
  }
}

export default Window;
