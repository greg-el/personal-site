import React from "react";

function Toolbar() {
  return (
    <div className="window-toolbar-wrapper" id="notepad-toolbar-container">
      <div className="window-toolbar" id="notepad-toolbar">
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
          <div className="toolbar-search">
            <u>S</u>earch
          </div>
        </div>
        <div className="window-toolbar-item toolbar-help-wrapper">
          <div className="toolbar-help">
            <u>H</u>elp
          </div>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
