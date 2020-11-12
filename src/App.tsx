import React from "react";
import "./App.css";
import ViewHandler from "./components/ViewHandler";

import ReactGA from 'react-ga';

ReactGA.initialize("G-TLFKH9ZPYS");
ReactGA.pageview(window.location.pathname + window.location.search);

interface IProps { }

interface IState { }

class App extends React.Component<IProps, IState> {
  render() {
    return (
      <ViewHandler
        bootText={[
          "PENTIUM-S CPU at 166mhz",
          "Memory Test : 65536K OK",
          "E:>boot -l c",
          "Booting from drive C...",
          "Starting MS-DOS...",
          "",
          "",
          "HIMEM is testing extended memory...",
          "Reading MOUSEDRV.INI initilization file",
          "Searching for mouse...",
          "",
          "",
          "",
        ]}
        baseWait={50}
      />
    );
  }
}

export default App;
