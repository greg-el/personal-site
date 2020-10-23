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

interface IProps { }

class ScreenHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      startMouseDown: false,
      startMouseUp: false,
      desktopMouseDown: false,
      desktopMouseUp: false,
      focusedElement: null,
      welcomeWindowState: WindowStateEnum.CLOSED,
      welcomeTaskbarState: WindowStateEnum.CLOSED,
      welcomeWindowZIndex: 0,
      aboutMeWindowState: WindowStateEnum.CLOSED,
      aboutMeTaskbarState: WindowStateEnum.CLOSED,
      aboutMeWindowZIndex: 0,
      windowStack: [],
    };
    this.setWindowState = this.setWindowState.bind(this);
    this.getWindowZIndex = this.getWindowZIndex.bind(this);
    this.moveWindowToFront = this.moveWindowToFront.bind(this);
    this.getTopWindowId = this.getTopWindowId.bind(this);
    this.addToWindowStack = this.addToWindowStack.bind(this);
    this.removeFromWindowStack = this.removeFromWindowStack.bind(this);
  }

  setFocusedElement = (val: any) => {
    if (val.id !== "desktop") {
      this.setState(
        {
          focusedElement: val.id,
        },
        () => console.log(this.state.focusedElement)
      );
    }
  };

  getTopWindowId() {
    return this.state.windowStack[this.state.windowStack.length - 1];
  }

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
        setFocusedElement={this.setFocusedElement}
        windowStackLength={this.state.windowStack.length}
        close={
          <Close
            id="welcome"
            taskbarStateName="welcomeTaskbarState"
            windowStateName="welcomeWindowState"
            setWindowState={this.setWindowState}
            removeWindowFromStack={this.removeFromWindowStack}
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

  addToWindowStack(window_id: string) {
    if (this.state.windowStack.indexOf(window_id) === -1) {
      this.setState({
        windowStack: [...this.state.windowStack, window_id]
      },() => {
        // Callback neccecary to immediatly update the zindex props, otherwise
        // zindex doesn't update until next refresh and stacking is incorrect
        let array = this.state.windowStack;
        for (let i = 0; i < array.length; i++) {
          this.setState({ [array[i] + "WindowZIndex"]: this.getWindowZIndex(array[i]) })
        }
      })
    }

  }

  removeFromWindowStack(window_id: string) {
    let array = Array.from(this.state.windowStack);
    let index = array.indexOf(window_id)
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ windowStack: array });
    };
  }

  getWindowZIndex(window_id: string) {
    return this.state.windowStack.indexOf(window_id);
  }

  moveWindowToFront(window_id: string) {
    let array = this.state.windowStack;
    array.push(array.splice(array.indexOf(window_id), 1)[0]);
    for (let i = 0; i < array.length; i++) {
      this.setState({ [array[i] + "WindowZIndex"]: this.getWindowZIndex(array[i]) })
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
        setFocusedElement={this.setFocusedElement}
        windowStackLength={this.state.windowStack.length}
        close={
          <Close
            id="aboutMe"
            taskbarStateName="aboutMeTaskbarState"
            windowStateName="aboutMeWindowState"
            setWindowState={this.setWindowState}
            removeWindowFromStack={this.removeFromWindowStack}
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
    console.log(this.state.windowStack)
    console.log(this.getTopWindowId())
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
              id="welcome"
              state={this.state.welcomeTaskbarState}
              focusedElement={this.state.focusedElement}
              label="Welcome"
              taskbarStateName="welcomeTaskbarState"
              windowStateName="welcomeWindowState"
              setWindowState={this.setWindowState}
              getTopWindowId={this.getTopWindowId}
              moveToFront={this.moveWindowToFront}
            ></TaskbarWindow>
            <TaskbarWindow
              id="aboutMe"
              state={this.state.aboutMeTaskbarState}
              focusedElement={this.state.focusedElement}
              label="About Me"
              taskbarStateName="aboutMeTaskbarState"
              windowStateName="aboutMeWindowState"
              setWindowState={this.setWindowState}
              getTopWindowId={this.getTopWindowId}
              moveToFront={this.moveWindowToFront}
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
            id="welcome"
            image={{ backgroundImage: `url( ${Logo})` }}
            label="Welcome"
            setWindowState={this.setWindowState}
            windowStateName="welcomeWindowState"
            taskbarStateName="welcomeTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
          ></StartMenuItem>
          <StartMenuItem
            id="aboutMe"
            image={{ backgroundImage: `url( ${Logo})` }}
            label="About Me"
            setWindowState={this.setWindowState}
            windowStateName="aboutMeWindowState"
            taskbarStateName="aboutMeTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
          ></StartMenuItem>
        </StartMenu>
      </div>
    );
  }
}

export default ScreenHandler;
