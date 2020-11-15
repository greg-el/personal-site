import ReactGA from "react-ga";
import { hotjar } from "react-hotjar";
import React from "react";
import "./App.css";
import ViewHandler from "./components/ViewHandler";

require("dotenv").config();

interface IProps {}

interface IState {}

class App extends React.Component<IProps, IState> {
  componentDidMount() {
    ReactGA.initialize(process.env.REACT_APP_GA_ID || "", {
      gaOptions: { cookieFlags: "max-age=7200;secure;samesite=none" },
    });
    ReactGA.pageview(window.location.pathname + window.location.search);

    hotjar.initialize(2099322, 0);
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
