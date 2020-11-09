import React, { ReactElement } from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import { WindowStateEnum, Dimensions, Position } from "../constants/index";

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
  resizeHandle?: boolean;
  size?: [number, number];
  openingPos?: { x: number; y: number };
  dragBounds?: string;
  desktopSize: Dimensions;
}

interface IState {
  focused: boolean;
  dimensions: Dimensions;
  position: Position;
}

interface Window {
  element: any;
}

class Window extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.element = React.createRef();
    this.state = {
      focused: true,
      dimensions: { width: 0, height: 0 },
      position: { right: 0, bottom: 0 },
    };
    this.setWindowDimensions = this.setWindowDimensions.bind(this);
  }

  setWindowDimensions() {
    let rect = this.element.current.getBoundingClientRect();
    if (
      rect.width !== this.state.dimensions.width &&
      rect.hight !== this.state.dimensions.height
    ) {
      this.setState({ dimensions: { width: rect.width, height: rect.height } });
    }
    if (
      rect.right !== this.state.position.right ||
      rect.bottom !== this.state.position.bottom
    ) {
      this.setState({ position: { right: rect.right, bottom: rect.bottom } });
    }
  }

  componentDidUpdate() {
    if (this.props.windowState !== WindowStateEnum.CLOSED) {
      this.setWindowDimensions();
    }
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
      let windowPos = this.props.openingPos
        ? this.props.openingPos
        : { x: 0, y: 0 };

      let dragBounds = this.props.dragBounds
        ? this.props.dragBounds
        : "#desktop";

      let handleElement = <span></span>;
      let resizeHandle = <div></div>;

      if (this.props.resize === true) {
        handleElement = <span className={"resize-handle"} />;
      }

      if (this.props.resizeHandle === true) {
        resizeHandle = <div className="window-resize-handle"></div>;
      }

      let maxRight =
        this.state.dimensions.width +
        (this.props.desktopSize.width - this.state.position.right);
      let maxBottom =
        this.state.dimensions.height +
        (this.props.desktopSize.height - this.state.position.bottom);
      console.log(maxRight, maxBottom);

      return (
        <Draggable
          handle=".window-title-bar-draggable"
          bounds={dragBounds}
          defaultPosition={windowPos}
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
              maxConstraints: [maxRight, maxBottom],
              resizeHandles: ["se"],
              className: "window-wrapper " + windowClass,
              style: { zIndex: this.props.zIndex },
              handle: (h: any) => handleElement,
            }}
          >
            <div
              ref={this.element}
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
