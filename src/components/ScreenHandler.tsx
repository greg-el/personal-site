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
import { WindowStateEnum, CursorStateEnum } from "../constants/index";
import TitlebarIcon from "./Window/TitlebarIcon";
import ShutDownIcon from "../image/icons/shutdown.png";
import DidYouKnow from "./Window/DidYouKnow";
import SystemProperties from "./Window/SystemProperties";
import ShutDown from "./Window/ShutDown";

import Cursor from "../image/cursor.svg";
import HourglassCursor from "../image/hourglass-cursor.svg";

interface IState {
  isStartMenuOpen: boolean;
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
  shutDownWindowState: WindowStateEnum;
  shutDownTaskbarState: WindowStateEnum;
  shutDownWindowZIndex: number;
  windowStack: Array<string>;
  taskbarStack: Array<string>;
  [key: string]: any;
  shutdown: boolean;
}

interface IProps {
  setScreenState: Function;
  setCursor: Function;
  cursor: CursorStateEnum;
}

class ScreenHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      isStartMenuOpen: false,
      welcomeWindowState: WindowStateEnum.CLOSED,
      welcomeTaskbarState: WindowStateEnum.CLOSED,
      welcomeWindowZIndex: 0,
      aboutMeWindowState: WindowStateEnum.CLOSED,
      aboutMeTaskbarState: WindowStateEnum.CLOSED,
      aboutMeWindowZIndex: 0,
      systemPropertiesWindowState: WindowStateEnum.CLOSED,
      systemPropertiesTaskbarState: WindowStateEnum.CLOSED,
      systemPropertiesWindowZIndex: 0,
      shutDownWindowState: WindowStateEnum.CLOSED,
      shutDownTaskbarState: WindowStateEnum.CLOSED,
      shutDownWindowZIndex: 0,
      windowStack: [],
      taskbarStack: [],
      shutdown: false,
    };
    this.setMenuOpen = this.setMenuOpen.bind(this);
    this.setMenuClosed = this.setMenuClosed.bind(this);
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
    this.setShutDownTrue = this.setShutDownTrue.bind(this);
  }

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

  setMenuOpen() {
    this.setState({ isStartMenuOpen: true });
  }

  setMenuClosed() {
    this.setState({ isStartMenuOpen: false });
  }

  setShutDownTrue() {
    this.setState({ shutdown: true });
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
        windowStackLength={this.state.windowStack.length}
        insideElement={<DidYouKnow />}
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
        windowStackLength={this.state.windowStack.length}
        insideElement={<SystemProperties />}
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

  shutDown() {
    return (
      <Window
        id="shutDown"
        name={"shutDown"}
        titlebarLabel={<TitlebarLabel labelText="Shut Down Windows" />}
        moveToFront={() => this.moveWindowToFront("shutDown")}
        zIndex={this.state.shutDownWindowZIndex}
        windowStackLength={this.state.windowStack.length}
        insideElement={
          <ShutDown
            setCursor={this.props.setCursor}
            setScreenState={this.props.setScreenState}
            id="shutDown"
            taskbarStateName="shutDownTaskbarState"
            windowStateName="shutDownWindowState"
            setWindowState={this.setWindowState}
            removeWindowFromStack={this.removeFromWindowStack}
            removeFromTaskbarStack={this.removeFromTaskbarStack}
          />
        }
        resize={false}
        size={[450, 250]}
        close={
          <Close
            id="shutDown"
            taskbarStateName="shutDownTaskbarState"
            windowStateName="shutDownWindowState"
            setWindowState={this.setWindowState}
            removeWindowFromStack={this.removeFromWindowStack}
            removeFromTaskbarStack={this.removeFromTaskbarStack}
          />
        }
        windowState={this.state.shutDownWindowState}
      ></Window>
    );
  }

  render() {
    let cursor = Cursor;
    if (this.props.cursor === CursorStateEnum.LOADING) {
      cursor = HourglassCursor;
    }
    return (
      <div id="screen-container" style={{ cursor: `url(.${cursor}), auto` }}>
        <Desktop>
          <Icon
            iconStyle={{ backgroundImage: `url( ${GitLabLogo})` }}
            label="GitLab"
            url="https://gitlab.com/greg-el"
            id="gitlab-icon"
          />
          <Icon
            iconStyle={{ backgroundImage: `url( ${GitHubLogo})` }}
            label="GitHub"
            url="https://github.com/greg-el"
            id="github-icon"
          />
          {this.AboutMeWindow()}
          {this.WelcomeWindow()}
          {this.SystemProperties()}
          {this.shutDown()}
        </Desktop>
        <div id="taskbar-wrapper">
          <Taskbar>
            <StartButton
              isStartMenuOpen={this.state.isStartMenuOpen}
              setStartMenuOpen={this.setMenuOpen}
              setStartMenuClosed={this.setMenuClosed}
              outsideClickIgnoreClass={"start-menu-item-wrapper"}
            />
            <div id="taskbar-windows-container">
              <TaskbarWindow
                id="welcome"
                state={this.state.welcomeTaskbarState}
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
                label="System Properties"
                taskbarStateName="systemPropertiesTaskbarState"
                windowStateName="systemPropertiesWindowState"
                setWindowState={this.setWindowState}
                getTopWindowId={this.getTopWindowId}
                moveToFront={this.moveWindowToFront}
                order={this.getTaskbarElementStackOrder}
              ></TaskbarWindow>
              <TaskbarWindow
                id="shutDown"
                state={this.state.shutDownTaskbarState}
                label="Shut Down Windows"
                taskbarStateName="shutDownTaskbarState"
                windowStateName="shutDownWindowState"
                setWindowState={this.setWindowState}
                getTopWindowId={this.getTopWindowId}
                moveToFront={this.moveWindowToFront}
                order={this.getTaskbarElementStackOrder}
              ></TaskbarWindow>
            </div>
            <SystemTray />
          </Taskbar>
        </div>
        <StartMenu startMenuOpen={this.state.isStartMenuOpen}>
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
            setMenuClosed={this.setMenuClosed}
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
            setMenuClosed={this.setMenuClosed}
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
            setMenuClosed={this.setMenuClosed}
          ></StartMenuItem>
          <StartMenuItem
            id="shutDown"
            image={{ backgroundImage: `url( ${ShutDownIcon})` }}
            style={{
              marginTop: "auto",
              borderTop: "1px solid grey",
              boxShadow: "0px -1px 1px rgba(255, 255, 255, 1)",
            }}
            label="Shut Down..."
            setWindowState={this.setWindowState}
            windowStateName="shutDownWindowState"
            taskbarStateName="shutDownTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
            setMenuClosed={this.setMenuClosed}
          ></StartMenuItem>
        </StartMenu>
      </div>
    );
  }
}

export default ScreenHandler;
