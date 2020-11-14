import React from "react";

function Toolbar() {
  return (
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
  );
}

export default Toolbar;
