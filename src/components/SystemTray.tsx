import React from "react";
import Clock from "./Clock";

class SystemTray extends React.Component {
  render() {
    return (
      <div id="system-tray-wrapper">
        <div id="system-tray">
          <Clock />
        </div>
      </div>
    );
  }
}

export default SystemTray;
