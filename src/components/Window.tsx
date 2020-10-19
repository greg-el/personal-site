import React from "react";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";

class Window extends React.Component {
  render() {
    return (
      <Draggable handle=".window-title-bar-draggable" bounds="parent">
        <ResizableBox
          className="window-wrapper"
          width={300}
          height={300}
          handle={(h) => <span className={"resize-handle"} />}
          handleSize={[35, 35]}
          minConstraints={[300, 300]}
          resizeHandles={["se"]}
        >
          <div className="window">
            <div className="window-resize-handle"></div>

            <div className="window-title-bar-container">
              <div className="title-bar">
                <div className="window-title-bar-draggable">
                  <div className="title-bar-icon-wrapper">
                    <div className="title-bar-icon"></div>
                  </div>
                  <div className="title-bar-label-wrapper">
                    <div className="title-bar-label"></div>
                  </div>
                </div>
                <div className="window-controls-container">
                  <div className="window-control-wrapper window-min-wrapper">
                    <button className="window-control window-min"></button>
                  </div>
                  <div className="window-control-wrapper window-max-wrapper">
                    <button className="window-control window-max"></button>
                  </div>
                  <div className="window-control-wrapper window-close-wrapper">
                    <button className="window-control window-close"></button>
                  </div>
                </div>
              </div>
            </div>
            <div className="window-toolbar-wrapper">
              <div className="window-toolbar">
                <div className="window-toolbar-item toolbar-file-wrapper">
                  <div className="toolbar-file">
                    <u>F</u>ile
                  </div>
                </div>
                <div className="window-toolbar-item toolbar-edit-wrapper">
                  <div className="toolbar-edit">
                    <u>E</u>dit
                  </div>
                </div>
                <div className="window-toolbar-item toolbar-view-wrapper">
                  <div className="toolbar-view">
                    <u>V</u>iew
                  </div>
                </div>
                <div className="window-toolbar-item toolbar-help-wrapper">
                  <div className="toolbar-help">
                    <u>H</u>elp
                  </div>
                </div>
              </div>
            </div>
            <div className="window-file-container-wrapper">
              <div className="window-file-container"></div>
            </div>
            <div className="window-details-panes-container">
              <div className="window-detail-pane-wrapper window-detail-pane-left-wrapper">
                <div className="window-detail-pane window-detail-pane-left"></div>
              </div>
              <div className="window-detail-pane-wrapper window-detail-pane-right-wrapper">
                <div className="window-detail-pane window-detail-pane-right"></div>
              </div>
            </div>
          </div>
        </ResizableBox>
      </Draggable>
    );
  }
}

export default Window;
