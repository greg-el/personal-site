import ReactGA from "react-ga";
import React from "react";
import "./App.css";
import ViewHandler from "./components/ViewHandler";

require("dotenv").config();

interface IProps {}

interface IState {}

class App extends React.Component<IProps, IState> {
  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GA_ID || "");
    ReactGA.pageview(window.location.pathname + window.location.search);
  }

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
