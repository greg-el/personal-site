import React from "react";
import Taskbar from "./Taskbar";
import StartMenu from "./StartMenu";
import StartButton from "./StartButton";
import Desktop from "./Desktop";
import Icon from "./Icon";
import SystemTray from "./SystemTray";
import StartMenuItem from "./StartMenuItem";
import Window from "./Window";
import GitLabLogo from "../image/GitLabLogoPixelShortcut.png";
import GitHubLogo from "../image/GitHubLogoPixelShortcut.png";
import Logo from "../image/logo.png";
import TitlebarIcon from "./Window/TitlebarIcon";
import Toolbar from "./Window/Toolbar";
import FileContainer from "./Window/FileContainer";
import DetailsPane from "./Window/DetailsPane";
import TitlebarLabel from "./Window/TitlebarLabel";
import Minimise from "./Window/Minimise";
import Maximise from "./Window/Maximise";
import Close from "./Window/Close";
import { WindowStateEnum, WindowStateObject } from "../constants/index";

interface IState {
  startMouseDown: boolean;
  startMouseUp: boolean;
  desktopMouseDown: boolean;
  desktopMouseUp: boolean;
  focusedElement: any;
  windowStates: Array<WindowStateObject>;
  indexer: WindowIndexGenerator;
}

interface IProps {}

class WindowIndexGenerator {
  index: number;

  constructor() {
    this.index = 0;
  }

  getIndex() {
    let out = this.index;
    this.index++;
    return out;
  }
}

class ScreenHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      startMouseDown: false,
      startMouseUp: false,
      desktopMouseDown: false,
      desktopMouseUp: false,
      focusedElement: null,
      windowStates: [],
      indexer: new WindowIndexGenerator(),
    };

    this.changeWindowState = this.changeWindowState.bind(this);
  }

  setFocusedElement = (val: any) => {
    this.setState(
      {
        focusedElement: val.id,
      },
      () => console.log(this.state.focusedElement)
    );
  };

  changeWindowState(windowState: WindowStateObject) {
    let windowStates = [...this.state.windowStates];
    let index = windowStates.findIndex((el) => el.index === windowState.index);
    windowStates[index] = windowState;
    this.setState({ windowStates });
  }

  addWindowState(name: string) {
    let newWindowState = new WindowStateObject(
      this.state.indexer.getIndex(),
      name,
      WindowStateEnum.OPEN
    );
    this.setState((prevState) => ({
      windowStates: [...prevState.windowStates, newWindowState],
    }));
    return newWindowState;
  }

  createOrOpenWindow(name: string) {
    for (let window of this.state.windowStates) {
      if (window.name === name) {
        return window;
      }
    }
    return this.createWindow(name);
  }

  createWindow(name: string) {
    let newWindowState = new WindowStateObject(
      this.state.indexer.getIndex(),
      name,
      WindowStateEnum.OPEN
    );
    return newWindowState;
  }

  render() {
    return (
      <div id="screen-container">
        <Desktop
          setFocusedElement={this.setFocusedElement}
          focusedElement={this.state.focusedElement}
          id="desktop"
        >
          <Icon
            iconStyle={{ backgroundImage: `url( ${GitLabLogo})` }}
            label="GitLab"
            url="https://gitlab.com/greg-el"
            id="gitlab-icon"
            focusedElement={this.state.focusedElement}
            setFocusedElement={this.setFocusedElement}
          />
          <Icon
            iconStyle={{ backgroundImage: `url( ${GitHubLogo})` }}
            label="GitHub"
            url="https://github.com/greg-el"
            id="github-icon"
            focusedElement={this.state.focusedElement}
            setFocusedElement={this.setFocusedElement}
          />
          <Window
            id="welcome"
            windowState={this.addWindowState("welcome")}
            close={
              <Close id="welcome" setWindowState={this.changeWindowState} />
            }
            titlebarLabel={<TitlebarLabel labelText="Welcome" />}
          ></Window>
        </Desktop>
        <div id="taskbar-wrapper">
          <Taskbar
            focusedElement={this.state.focusedElement}
            setFocusedElement={this.setFocusedElement}
            id="taskbar"
          >
            <StartButton
              focusedElement={this.state.focusedElement}
              setFocusedElement={this.setFocusedElement}
              id="start-button"
            />
            <SystemTray />
          </Taskbar>
        </div>
        <StartMenu
          focusedElement={this.state.focusedElement}
          setFocusedElement={this.setFocusedElement}
          id="start-menu"
        >
          <StartMenuItem
            onClickHandler={this.createOrOpenWindow}
            image={{ backgroundImage: `url( ${Logo})` }}
            label="Welcome"
          ></StartMenuItem>
        </StartMenu>
      </div>
    );
  }
}

export default ScreenHandler;
