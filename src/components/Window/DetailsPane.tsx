import React from "react";

function DetailsPane() {
  return (
    <div className="window-details-panes-container">
      <div className="window-detail-pane-wrapper window-detail-pane-left-wrapper">
        <div className="window-detail-pane window-detail-pane-left"></div>
      </div>
      <div className="window-detail-pane-wrapper window-detail-pane-right-wrapper">
        <div className="window-detail-pane window-detail-pane-right"></div>
      </div>
    </div>
  );
}

export default DetailsPane;
