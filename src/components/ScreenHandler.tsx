import React, { ReactElement } from "react";
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
import TitlebarLabel from "./Window/TitlebarLabel";
import Close from "./Window/Close";
import Minimise from "./Window/Minimise";
import TaskbarWindow from "./TaskbarWindow";
import { WindowStateEnum } from "../constants/index";

interface IState {
  startMouseDown: boolean;
  startMouseUp: boolean;
  desktopMouseDown: boolean;
  desktopMouseUp: boolean;
  focusedElement: any;
  indexer: WindowIndexGenerator;
  welcomeWindowState: WindowStateEnum;
  welcomeTaskbarState: WindowStateEnum;
  welcomeWindow?: ReactElement;
  aboutMeWindowState: WindowStateEnum;
  aboutMeWindow?: ReactElement;
  [key: string]: any;
}

interface IProps {}

class WindowIndexGenerator {
  index: number;

  constructor() {
    this.index = 0;
    this.getIndex = this.getIndex.bind(this);
  }

  getIndex() {
    console.log(this.index);
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
      indexer: new WindowIndexGenerator(),
      welcomeWindowState: WindowStateEnum.CLOSED,
      welcomeTaskbarState: WindowStateEnum.CLOSED,
      aboutMeWindowState: WindowStateEnum.CLOSED,
    };
    this.setWindowState = this.setWindowState.bind(this);
  }

  setFocusedElement = (val: any) => {
    this.setState(
      {
        focusedElement: val.id,
      },
      () => console.log(this.state.focusedElement)
    );
  };

  setWindowState(taskbar: string, window: string, state: WindowStateEnum) {
    this.setState({ [window]: state });
    this.setState({ [taskbar]: state });
  }

  WelcomeWindow() {
    return (
      <Window
        name={"Welcome"}
        titlebarLabel={<TitlebarLabel labelText="Welcome" />}
        close={
          <Close
            taskbarStateName="welcomeTaskbarState"
            windowStateName="welcomeWindowState"
            setWindowState={this.setWindowState}
          />
        }
        minimise={
          <Minimise
            taskbarStateName="welcomeTaskbarState"
            windowStateName="welcomeWindowState"
            setWindowState={this.setWindowState}
          />
        }
        windowState={this.state.welcomeWindowState}
      ></Window>
    );
  }

  AboutMeWindow() {
    return (
      <Window
        name={"About Me"}
        titlebarLabel={<TitlebarLabel labelText="About Me" />}
        close={
          <Close
            taskbarStateName="aboutMeTaskbarState"
            windowStateName="aboutMeWindowState"
            setWindowState={this.setWindowState}
          />
        }
        minimise={
          <Minimise
            taskbarStateName="aboutMeTaskbarState"
            windowStateName="aboutMeWindowState"
            setWindowState={this.setWindowState}
          />
        }
        windowState={this.state.aboutMeWindowState}
      ></Window>
    );
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
          {this.WelcomeWindow()}
          {this.AboutMeWindow()}
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
            <TaskbarWindow
              state={this.state.welcomeTaskbarState}
              focused={false}
              label="Welcome"
            ></TaskbarWindow>
            <SystemTray />
          </Taskbar>
        </div>
        <StartMenu
          focusedElement={this.state.focusedElement}
          setFocusedElement={this.setFocusedElement}
          id="start-menu"
        >
          <StartMenuItem
            image={{ backgroundImage: `url( ${Logo})` }}
            label="Welcome"
            setWindowState={this.setWindowState}
            windowStateName="welcomeWindowState"
            taskbarStateName="welcomeTaskbarState"
          ></StartMenuItem>
          <StartMenuItem
            image={{ backgroundImage: `url( ${Logo})` }}
            label="About Me"
            setWindowState={this.setWindowState}
            windowStateName="aboutMeWindowState"
            taskbarStateName="aboutMeTaskbarState"
          ></StartMenuItem>
        </StartMenu>
      </div>
    );
  }
}

export default ScreenHandler;
