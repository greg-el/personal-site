import React from "react";

class Clock extends React.Component {
  render() {
    let d = new Date();
    let hour = d.getHours();
    let amPm = hour <= 12 ? "PM" : "AM";
    let minute = d.getMinutes();
    let fMiniute = (minute < 10 ? "0" : "") + minute;
    return (
      <div id="clock-wrapper">
        <div id="clock">{hour + ":" + fMiniute + " " + amPm}</div>
      </div>
    );
  }
}

export default Clock;
