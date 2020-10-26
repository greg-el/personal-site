import React from "react";

class Clock extends React.Component {
  render() {
    let d = new Date();
    let hour = d.getHours();
    let fHour = (hour < 10 ? "0" : "") + hour;
    let minute = d.getMinutes();
    let fMiniute = (minute < 10 ? "0" : "") + minute;
    return (
      <div id="clock-wrapper">
        <div id="clock">{fHour + ":" + fMiniute}</div>
      </div>
    );
  }
}

export default Clock;
