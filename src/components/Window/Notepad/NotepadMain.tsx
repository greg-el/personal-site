import React from "react";
import Background from "./Background";
import Toolbar from "./Toolbar";

function Notepad() {
  return (
    <div id="notepad-component-container">
      <Toolbar />
      <Background />
    </div>
  );
}

export default Notepad;
