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
import UserWithComputerIcon from "../image/icons/User-with-computer.png";
import Book4Icon from "../image/icons/Book-4.png";
import SettingsIcon from "../image/icons/settings.png";
import TitlebarLabel from "./Window/TitlebarLabel";
import Close from "./Window/Close";
import Minimise from "./Window/Minimise";
import TaskbarWindow from "./TaskbarWindow";
import { WindowStateEnum } from "../constants/index";
import TitlebarIcon from "./Window/TitlebarIcon";
import DidYouKnow from "./Window/DidYouKnow";
import SystemProperties from "./Window/SystemProperties";

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
  systemPropertiesWindowState: WindowStateEnum;
  systemPropertiesWindow?: ReactElement;
  systemPropertiesWindowZIndex: number;
  windowStack: Array<string>;
  taskbarStack: Array<string>;
  [key: string]: any;
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
      focusedElement: null,
      welcomeWindowState: WindowStateEnum.CLOSED,
      welcomeTaskbarState: WindowStateEnum.CLOSED,
      welcomeWindowZIndex: 0,
      aboutMeWindowState: WindowStateEnum.CLOSED,
      aboutMeTaskbarState: WindowStateEnum.CLOSED,
      aboutMeWindowZIndex: 0,
      systemPropertiesWindowState: WindowStateEnum.CLOSED,
      systemPropertiesTaskbarState: WindowStateEnum.CLOSED,
      systemPropertiesWindowZIndex: 0,
      windowStack: [],
      taskbarStack: [],
    };
    this.setWindowState = this.setWindowState.bind(this);
    this.getWindowZIndex = this.getWindowZIndex.bind(this);
    this.moveWindowToFront = this.moveWindowToFront.bind(this);
    this.getTopWindowId = this.getTopWindowId.bind(this);
    this.addToWindowStack = this.addToWindowStack.bind(this);
    this.removeFromWindowStack = this.removeFromWindowStack.bind(this);
    this.addToTaskbarStack = this.addToTaskbarStack.bind(this);
    this.removeFromTaskbarStack = this.removeFromTaskbarStack.bind(this);
    this.getTaskbarElementStackOrder = this.getTaskbarElementStackOrder.bind(
      this
    );
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

  addToTaskbarStack(window_id: string) {
    if (this.state.taskbarStack.indexOf(window_id) === -1) {
      this.setState({
        taskbarStack: [...this.state.taskbarStack, window_id],
      });
    }
  }

  removeFromTaskbarStack(window_id: string) {
    let array = Array.from(this.state.taskbarStack);
    let index = array.indexOf(window_id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ taskbarStack: array });
    }
  }

  getTaskbarElementStackOrder(window_id: string) {
    return this.state.taskbarStack.indexOf(window_id);
  }

  addToWindowStack(window_id: string) {
    if (this.state.windowStack.indexOf(window_id) === -1) {
      this.setState(
        {
          windowStack: [...this.state.windowStack, window_id],
        },
        () => {
          // Callback necessary to immediately update the zindex props, otherwise
          // zindex doesn't update until next refresh and stacking is incorrect
          let array = this.state.windowStack;
          for (let i = 0; i < array.length; i++) {
            this.setState({
              [array[i] + "WindowZIndex"]: this.getWindowZIndex(array[i]),
            });
          }
        }
      );
    }
  }

  removeFromWindowStack(window_id: string) {
    let array = Array.from(this.state.windowStack);
    let index = array.indexOf(window_id);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ windowStack: array });
    }
  }

  getWindowZIndex(window_id: string) {
    return this.state.windowStack.indexOf(window_id);
  }

  moveWindowToFront(window_id: string) {
    let array = this.state.windowStack;
    array.push(array.splice(array.indexOf(window_id), 1)[0]);
    for (let i = 0; i < array.length; i++) {
      this.setState({
        [array[i] + "WindowZIndex"]: this.getWindowZIndex(array[i]),
      });
    }
  }

  WelcomeWindow() {
    return (
      <Window
        id="welcome"
        name={"Welcome"}
        titlebarIcon={
          <TitlebarIcon icon={{ backgroundImage: `url( ${Book4Icon})` }} />
        }
        titlebarLabel={<TitlebarLabel labelText="Welcome" />}
        moveToFront={() => this.moveWindowToFront("welcome")}
        zIndex={this.state.welcomeWindowZIndex}
        setFocusedElement={this.setFocusedElement}
        windowStackLength={this.state.windowStack.length}
        didYouKnow={<DidYouKnow />}
        resize={false}
        close={
          <Close
            id="welcome"
            taskbarStateName="welcomeTaskbarState"
            windowStateName="welcomeWindowState"
            setWindowState={this.setWindowState}
            removeWindowFromStack={this.removeFromWindowStack}
            removeFromTaskbarStack={this.removeFromTaskbarStack}
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
        id="aboutMe"
        name={"About Me"}
        titlebarIcon={
          <TitlebarIcon
            icon={{ backgroundImage: `url( ${UserWithComputerIcon})` }}
          />
        }
        titlebarLabel={<TitlebarLabel labelText="About Me" />}
        moveToFront={() => this.moveWindowToFront("aboutMe")}
        zIndex={this.state.aboutMeWindowZIndex}
        setFocusedElement={this.setFocusedElement}
        windowStackLength={this.state.windowStack.length}
        resize={true}
        close={
          <Close
            id="aboutMe"
            taskbarStateName="aboutMeTaskbarState"
            windowStateName="aboutMeWindowState"
            setWindowState={this.setWindowState}
            removeWindowFromStack={this.removeFromWindowStack}
            removeFromTaskbarStack={this.removeFromTaskbarStack}
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

  SystemProperties() {
    return (
      <Window
        id="systemProperties"
        name={"System Properties"}
        titlebarIcon={
          <TitlebarIcon icon={{ backgroundImage: `url( ${SettingsIcon})` }} />
        }
        titlebarLabel={<TitlebarLabel labelText="System Properties" />}
        moveToFront={() => this.moveWindowToFront("systemProperties")}
        zIndex={this.state.systemPropertiesWindowZIndex}
        setFocusedElement={this.setFocusedElement}
        windowStackLength={this.state.windowStack.length}
        systemProperties={<SystemProperties />}
        resize={true}
        close={
          <Close
            id="systemProperties"
            taskbarStateName="systemPropertiesTaskbarState"
            windowStateName="systemPropertiesWindowState"
            setWindowState={this.setWindowState}
            removeWindowFromStack={this.removeFromWindowStack}
            removeFromTaskbarStack={this.removeFromTaskbarStack}
          />
        }
        minimise={
          <Minimise
            taskbarStateName="systemPropertiesTaskbarState"
            windowStateName="systemPropertiesWindowState"
            setWindowState={this.setWindowState}
          />
        }
        windowState={this.state.systemPropertiesWindowState}
      ></Window>
    );
  }

  render() {
    console.log(this.state.taskbarStack);
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
          {this.SystemProperties()}
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
            <div id="taskbar-windows-container">
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
                order={this.getTaskbarElementStackOrder}
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
                order={this.getTaskbarElementStackOrder}
              ></TaskbarWindow>
              <TaskbarWindow
                id="systemProperties"
                state={this.state.systemPropertiesTaskbarState}
                focusedElement={this.state.focusedElement}
                label="System Properties"
                taskbarStateName="systemPropertiesTaskbarState"
                windowStateName="systemPropertiesWindowState"
                setWindowState={this.setWindowState}
                getTopWindowId={this.getTopWindowId}
                moveToFront={this.moveWindowToFront}
                order={this.getTaskbarElementStackOrder}
              ></TaskbarWindow>
            </div>
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
            image={{ backgroundImage: `url( ${Book4Icon})` }}
            label="Welcome"
            setWindowState={this.setWindowState}
            windowStateName="welcomeWindowState"
            taskbarStateName="welcomeTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
          ></StartMenuItem>
          <StartMenuItem
            id="aboutMe"
            image={{ backgroundImage: `url( ${UserWithComputerIcon})` }}
            label="About Me"
            setWindowState={this.setWindowState}
            windowStateName="aboutMeWindowState"
            taskbarStateName="aboutMeTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
          ></StartMenuItem>
          <StartMenuItem
            id="systemProperties"
            image={{ backgroundImage: `url( ${SettingsIcon})` }}
            label="System Properties"
            setWindowState={this.setWindowState}
            windowStateName="systemPropertiesWindowState"
            taskbarStateName="systemPropertiesTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
          ></StartMenuItem>
        </StartMenu>
      </div>
    );
  }
}

export default ScreenHandler;
