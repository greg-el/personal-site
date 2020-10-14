import React from "react";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import StartButton from "./StartButton";
import Desktop from "./Desktop";
import Icon from "./Icon";

interface IState {
  startMouseDown: boolean;
  startMouseUp: boolean;
  desktopMouseDown: boolean;
  desktopMouseUp: boolean;
}

interface IProps {}

class ScreenHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      startMouseDown: false,
      startMouseUp: false,
      desktopMouseDown: false,
      desktopMouseUp: false,
    };
    this.startMouseDown = this.startMouseDown.bind(this);
    this.startMouseUp = this.startMouseUp.bind(this);
    this.desktopMouseDown = this.desktopMouseDown.bind(this);
    this.desktopMouseUp = this.desktopMouseUp.bind(this);
  }

  startMouseDown(event: any) {
    this.setState({
      startMouseDown: true,
      startMouseUp: false,
    });
  }

  startMouseUp(event: any) {
    this.setState({
      startMouseDown: false,
      startMouseUp: true,
    });
  }

  desktopMouseDown(event: any) {
    this.setState({
      desktopMouseDown: true,
      desktopMouseUp: false,
    });
  }

  desktopMouseUp(event: any) {
    this.setState({
      desktopMouseDown: false,
      desktopMouseUp: true,
    });
  }

  render() {
    return (
      <div id="screen-container">
        <Desktop
          desktopMouseDown={this.state.desktopMouseDown}
          onDesktopMouseDown={this.desktopMouseDown}
          desktopMouseUp={this.state.desktopMouseUp}
          onDesktopMouseUp={this.desktopMouseUp}
        />
        <div id="taskbar-wrapper">
          <Taskbar>
            <StartButton
              startMouseDown={this.state.startMouseDown}
              startMouseUp={this.state.startMouseUp}
              onMouseDown={this.startMouseDown}
              onMouseUp={this.startMouseUp}
            />
          </Taskbar>
        </div>
        <StartMenu
          startMouseDown={this.state.startMouseDown}
          onStartMouseDown={this.startMouseDown}
          desktopMouseDown={this.state.desktopMouseDown}
          onDesktopMouseDown={this.desktopMouseDown}
        />
      </div>
    );
  }
}

export default ScreenHandler;
