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
  maximise?: React.Component;
  toolbar?: React.Component;
  fileContainer?: React.Component;
  detailsPane?: React.Component;
  windowState: WindowStateEnum;
  moveToFront: Function;
  zIndex: number;
  windowStackLength: number;
  setFocusedElement: Function;
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

  _handleSingleClick(event: React.SyntheticEvent) {
    let target = event.currentTarget;
    this.props.setFocusedElement(target);
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

      /* let resizeProps: 
     };
     */

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
              width: 300,
              height: 300,
              handleSize: [35, 35],
              minConstraints: [300, 300],
              resizeHandles: ["se"],
              className: "window-wrapper " + windowClass,
              style: { zIndex: this.props.zIndex },
              handle: (h: any) => <span className={"resize-handle"} />,
            }}
          >
            <div
              id={this.props.name}
              className="window"
              onMouseDown={(e) => {
                this.props.moveToFront();
                this._handleSingleClick(e);
              }}
            >
              <div className="window-resize-handle"></div>
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
