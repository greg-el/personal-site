import React from "react";

function randomDidYouKnow() {
  let didYouKnows = ["You should hire me as a junior dev"];

  return didYouKnows[Math.floor(Math.random() * didYouKnows.length)];
}

function DidYouKnow() {
  return (
    <div id="dyk-container">
      <div id="dyk-icon-wrapper">
        <div id="dyk-icon"></div>
      </div>
      <div id="dyk-main-wrapper">
        <div id="dyk-text-wrapper">
          <div id="dyk-did-you-know-message">Did you know...</div>
          <div id="dyk-text">{randomDidYouKnow()}</div>
        </div>
        <div id="dyk-pc-wrapper">
          <div id="dyk-pc"></div>
        </div>
      </div>
    </div>
  );
}

export default DidYouKnow;
