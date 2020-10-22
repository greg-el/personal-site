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
  welcomeWindowZIndex: number;
  aboutMeWindowState: WindowStateEnum;
  aboutMeWindow?: ReactElement;
  aboutMeWindowZIndex: number;
  windowStack: Array<string>;
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
      welcomeWindowZIndex: 0,
      aboutMeWindowState: WindowStateEnum.CLOSED,
      aboutMeTaskbarState: WindowStateEnum.CLOSED,
      aboutMeWindowZIndex: 0,
      windowStack: ["welcome", "aboutMe"],
    };
    this.setWindowState = this.setWindowState.bind(this);
    this.getWindowZIndex = this.getWindowZIndex.bind(this);
    this.moveWindowToFront = this.moveWindowToFront.bind(this);
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
        id="welcome"
        name={"Welcome"}
        titlebarLabel={<TitlebarLabel labelText="Welcome" />}
        moveToFront={() => this.moveWindowToFront("welcome")}
        zIndex={this.state.welcomeWindowZIndex}
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

  getWindowZIndex(window_id: string) {
    return this.state.windowStack.indexOf(window_id);
  }

  moveWindowToFront(window_id: string) {
    let array = this.state.windowStack;
    array.push(array.splice(array.indexOf(window_id), 1)[0]);
    for (let i=0; i<array.length; i++) {
      this.setState({[array[i]+"WindowZIndex"]: this.getWindowZIndex(array[i])})
    }
  }

  AboutMeWindow() {
    return (
      <Window
        id="aboutMe"
        name={"About Me"}
        titlebarLabel={<TitlebarLabel labelText="About Me" />}
        moveToFront={() => this.moveWindowToFront("aboutMe")}
        zIndex={this.state.aboutMeWindowZIndex}
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
          {this.AboutMeWindow()}
          {this.WelcomeWindow()}
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
              taskbarStateName="welcomeTaskbarState"
              windowStateName="welcomeWindowState"
              setWindowState={this.setWindowState}
            ></TaskbarWindow>
            <TaskbarWindow
              state={this.state.aboutMeTaskbarState}
              focused={false}
              label="About Me"
              taskbarStateName="aboutMeTaskbarState"
              windowStateName="aboutMeWindowState"
              setWindowState={this.setWindowState}
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
