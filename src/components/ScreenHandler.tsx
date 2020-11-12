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
import {
  WindowStateEnum,
  CursorStateEnum,
  Dimensions,
} from "../constants/index";
import TitlebarIcon from "./Window/TitlebarIcon";
import ShutDownIcon from "../image/icons/shutdown.png";
import DidYouKnow from "./Window/DidYouKnow";
import SystemProperties from "./Window/SystemProperties";
import ShutDown from "./Window/ShutDown";
import Cursor from "../image/cursor.svg";
import HourglassCursor from "../image/hourglass-cursor.svg";
import ShutDownGrille from "../image/shutdown-grille.svg";
import InternetExplorer from "./Window/InternetExplorer";
import GitHub from "./Window/GitHub";
import GitLab from "./Window/GitLab";
import GitHubIconNoShortcut from "../image/GitHubLogoPixelNoShortcut.png";

interface IState {
  cursor: CursorStateEnum;
  isStartMenuOpen: boolean;
  welcomeWindowState: WindowStateEnum;
  welcomeTaskbarState: WindowStateEnum;
  welcomeWindow?: ReactElement;
  welcomeWindowZIndex: number;

  aboutMeWindowState: WindowStateEnum;
  aboutMeTaskbarState: WindowStateEnum;
  aboutMeWindowZIndex: number;

  systemPropertiesWindowState: WindowStateEnum;
  systemPropertiesTaskbarState: WindowStateEnum;
  systemPropertiesWindowZIndex: number;

  shutDownWindowState: WindowStateEnum;
  shutDownTaskbarState: WindowStateEnum;
  shutDownWindowZIndex: number;

  internetExplorerWindowState: WindowStateEnum;
  internetExplorerTaskbarState: WindowStateEnum;
  internetExplorerWindowZIndex: number;

  gitHubWindowState: WindowStateEnum;
  gitHubTaskbarState: WindowStateEnum;
  gitHubWindowZIndex: number;

  gitLabWindowState: WindowStateEnum;
  gitLabTaskbarState: WindowStateEnum;
  gitLabWindowZIndex: number;

  windowStack: Array<string>;
  taskbarStack: Array<string>;

  screenSize: Dimensions;
  desktopSize: Dimensions;

  [key: string]: any;
  shutdown: boolean;
}

interface IProps {
  setScreenState: Function;
}

class ScreenHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cursor: CursorStateEnum.POINTER,
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
      internetExplorerWindowState: WindowStateEnum.CLOSED,
      internetExplorerTaskbarState: WindowStateEnum.CLOSED,
      internetExplorerWindowZIndex: 0,
      gitHubWindowState: WindowStateEnum.CLOSED,
      gitHubTaskbarState: WindowStateEnum.CLOSED,
      gitHubWindowZIndex: 0,
      gitLabWindowState: WindowStateEnum.CLOSED,
      gitLabTaskbarState: WindowStateEnum.CLOSED,
      gitLabWindowZIndex: 0,
      windowStack: [],
      taskbarStack: [],
      shutdown: false,
      screenSize: { width: 0, height: 0 },
      desktopSize: { width: 0, height: 0 },
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
    this.setCursor = this.setCursor.bind(this);
    this.handleResize = this.handleResize.bind(this);

    window.addEventListener("resize", this.handleResize);
  }

  // For styling the titlebar of the front most window
  getTopWindowId() {
    return this.state.windowStack[this.state.windowStack.length - 1];
  }

  /* 
  -----------------------------------------
  Window/Taskbar Stack/State Functions
  -----------------------------------------
  */

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

  /* 
  -----------------------------------------
  Menu Functions
  -----------------------------------------
  */

  setMenuOpen() {
    this.setState({ isStartMenuOpen: true });
  }

  setMenuClosed() {
    this.setState({ isStartMenuOpen: false });
  }

  setShutDownTrue() {
    this.setState({ shutdown: true });
  }

  setCursor(val: CursorStateEnum) {
    this.setState({ cursor: val });
  }

  /* 
  -----------------------------------------
  Window Definitions
  -----------------------------------------
  */

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
        desktopSize={this.state.desktopSize}
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
        desktopSize={this.state.desktopSize}
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
        desktopSize={this.state.desktopSize}
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
        zIndex={99} // Needs to appear in front of everything when opened
        windowStackLength={100} // To make it focused on open
        openingPos={{
          x: window.innerWidth / 2 - 450 / 2,
          y: window.innerHeight / 2 - 250 / 2,
        }}
        dragBounds={"#screen-container"}
        insideElement={
          <ShutDown
            setCursor={this.setCursor}
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
        desktopSize={this.state.desktopSize}
        size={[450, 250]}
        close={
          <Close
            id="shutDown"
            taskbarStateName="shutDownTaskbarState"
            windowStateName="shutDownWindowState"
            removeWindowFromStack={this.removeFromWindowStack}
            removeFromTaskbarStack={this.removeFromTaskbarStack}
            setWindowState={this.setWindowState}
          />
        }
        windowState={this.state.shutDownWindowState}
        minimise={
          <Minimise
            taskbarStateName="shutDownTaskbarState"
            windowStateName="shutDownWindowState"
            setWindowState={this.setWindowState}
          />
        }
      ></Window>
    );
  }

  GitHub() {
    return (
      <Window
        id="gitHub"
        name={"gitHub"}
        titlebarIcon={
          <TitlebarIcon
            icon={{ backgroundImage: `url( ${GitHubIconNoShortcut})` }}
          />
        }
        titlebarLabel={
          <TitlebarLabel labelText="Internet Explorer - GitHub // greg-el" />
        }
        moveToFront={() => this.moveWindowToFront("gitHub")}
        zIndex={this.state.gitHubWindowZIndex}
        windowStackLength={this.state.windowStack.length}
        insideElement={
          <InternetExplorer
            page={<GitHub />}
            url="https://github.com/greg-el"
          />
        }
        resize={true}
        resizeHandle={false}
        desktopSize={this.state.desktopSize}
        close={
          <Close
            id="gitHub"
            taskbarStateName="gitHubTaskbarState"
            windowStateName="gitHubWindowState"
            setWindowState={this.setWindowState}
            removeWindowFromStack={this.removeFromWindowStack}
            removeFromTaskbarStack={this.removeFromTaskbarStack}
          />
        }
        windowState={this.state.gitHubWindowState}
        minimise={
          <Minimise
            taskbarStateName="gitHubTaskbarState"
            windowStateName="gitHubWindowState"
            setWindowState={this.setWindowState}
          />
        }
      ></Window>
    );
  }

  GitLab() {
    return (
      <Window
        id="gitLab"
        name={"gitLab"}
        titlebarIcon={
          <TitlebarIcon icon={{ backgroundImage: `url( ${GitLabLogo})` }} />
        }
        titlebarLabel={
          <TitlebarLabel labelText="Internet Explorer - GitLab // greg-el" />
        }
        moveToFront={() => this.moveWindowToFront("gitLab")}
        zIndex={this.state.gitLabWindowZIndex}
        windowStackLength={this.state.windowStack.length}
        insideElement={
          <InternetExplorer
            page={<GitLab />}
            url="https://gitlab.com/greg-el"
          />
        }
        resize={true}
        resizeHandle={false}
        desktopSize={this.state.desktopSize}
        close={
          <Close
            id="gitLab"
            taskbarStateName="gitLabTaskbarState"
            windowStateName="gitLabWindowState"
            setWindowState={this.setWindowState}
            removeWindowFromStack={this.removeFromWindowStack}
            removeFromTaskbarStack={this.removeFromTaskbarStack}
          />
        }
        windowState={this.state.gitLabWindowState}
        minimise={
          <Minimise
            taskbarStateName="gitLabTaskbarState"
            windowStateName="gitLabWindowState"
            setWindowState={this.setWindowState}
          />
        }
      ></Window>
    );
  }

  /* 
  -----------------------------------------
  Fix Warning: Can't perform a React state update on an unmounted component
  -----------------------------------------
  */

  componentWillUnmount() {
    this.setState = (state, callback) => {
      return;
    };
  }

  componentDidMount() {
    let x = window.innerWidth;
    let y = window.innerHeight;

    // Height/Width difference between full screen size and desktop space
    let screenWidthDifference = 7;
    let screenHeightDifference = 47;

    this.setState({
      screenSize: { width: x, height: y },
      desktopSize: {
        width: x - screenWidthDifference,
        height: y - screenHeightDifference,
      },
    });
  }

  /* 
  -----------------------------------------
  Detecting Window Size on Resize 
  -----------------------------------------
  */

  handleResize() {
    // Height/Width difference between full screen size and desktop space
    let screenWidthDifference = 7;
    let screenHeightDifference = 47;

    let x = window.innerWidth;
    let y = window.innerHeight;
    if (
      this.state.screenSize.width !== x ||
      this.state.screenSize.height !== y
    ) {
      this.setState({
        screenSize: { width: x, height: y },
        desktopSize: {
          width: x - screenWidthDifference,
          height: y - screenHeightDifference,
        },
      });
    }
  }

  render() {
    let grilleStyle = { backgroundImage: "", display: "none" };
    if (this.state.shutDownWindowState === WindowStateEnum.OPEN) {
      grilleStyle.backgroundImage = `url(${ShutDownGrille})`;
      grilleStyle.display = "block";
    }
    let cursor = Cursor;
    if (this.state.cursor === CursorStateEnum.LOADING) {
      cursor = HourglassCursor;
    }
    return (
      <div id="screen-container" style={{ cursor: `url(${cursor}), auto` }}>
        <div id="shut-down-cover" style={grilleStyle}></div>
        <Desktop>
          <Icon
            iconStyle={{ backgroundImage: `url( ${GitLabLogo})` }}
            label="GitLab"
            url="https://gitlab.com/greg-el"
            id="gitLab"
            setWindowState={this.setWindowState}
            windowStateName="gitLabWindowState"
            taskbarStateName="gitLabTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
          />
          <Icon
            iconStyle={{ backgroundImage: `url( ${GitHubLogo})` }}
            label="GitHub"
            url="https://github.com/greg-el"
            id="gitHub"
            setWindowState={this.setWindowState}
            windowStateName="gitHubWindowState"
            taskbarStateName="gitHubTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
          />
          {this.AboutMeWindow()}
          {this.WelcomeWindow()}
          {this.SystemProperties()}
          {this.shutDown()}
          {this.GitHub()}
          {this.GitLab()}
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
                icon={{ backgroundImage: `url( ${Book4Icon})` }}
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
                icon={{ backgroundImage: `url( ${UserWithComputerIcon})` }}
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
                icon={{ backgroundImage: `url( ${SettingsIcon})` }}
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
                icon={{ backgroundImage: `url( ${ShutDownIcon})` }}
                label="Shut Down Windows"
                taskbarStateName="shutDownTaskbarState"
                windowStateName="shutDownWindowState"
                setWindowState={this.setWindowState}
                getTopWindowId={this.getTopWindowId}
                moveToFront={this.moveWindowToFront}
                order={this.getTaskbarElementStackOrder}
              ></TaskbarWindow>
              <TaskbarWindow
                id="gitHub"
                state={this.state.gitHubTaskbarState}
                icon={{ backgroundImage: `url( ${GitHubIconNoShortcut})` }}
                label="Internet Explorer"
                taskbarStateName="gitHubTaskbarState"
                windowStateName="gitHubWindowState"
                setWindowState={this.setWindowState}
                getTopWindowId={this.getTopWindowId}
                moveToFront={this.moveWindowToFront}
                order={this.getTaskbarElementStackOrder}
              ></TaskbarWindow>
              <TaskbarWindow
                id="gitLab"
                state={this.state.gitLabTaskbarState}
                icon={{ backgroundImage: `url( ${GitLabLogo})` }}
                label="Internet Explorer"
                taskbarStateName="gitLabTaskbarState"
                windowStateName="gitLabWindowState"
                setWindowState={this.setWindowState}
                getTopWindowId={this.getTopWindowId}
                moveToFront={this.moveWindowToFront}
                order={this.getTaskbarElementStackOrder}
              ></TaskbarWindow>
            </div>
            <SystemTray />
          </Taskbar>
        </div>
        <StartMenu isStartMenuOpen={this.state.isStartMenuOpen}>
          <StartMenuItem
            id="welcome"
            image={{ backgroundImage: `url( ${Book4Icon})` }}
            label={
              <div className="start-menu-item-label">
                <u>W</u>elcome
              </div>
            }
            hotkey="w"
            setWindowState={this.setWindowState}
            windowStateName="welcomeWindowState"
            taskbarStateName="welcomeTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
            setMenuClosed={this.setMenuClosed}
            isStartMenuOpen={this.state.isStartMenuOpen}
          ></StartMenuItem>
          <StartMenuItem
            id="aboutMe"
            image={{ backgroundImage: `url( ${UserWithComputerIcon})` }}
            label={
              <div className="start-menu-item-label">
                <u>A</u>bout Me
              </div>
            }
            hotkey="a"
            setWindowState={this.setWindowState}
            windowStateName="aboutMeWindowState"
            taskbarStateName="aboutMeTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
            setMenuClosed={this.setMenuClosed}
            isStartMenuOpen={this.state.isStartMenuOpen}
          ></StartMenuItem>
          <StartMenuItem
            id="systemProperties"
            image={{ backgroundImage: `url( ${SettingsIcon})` }}
            label={
              <div className="start-menu-item-label">
                <u>S</u>ystem Properties
              </div>
            }
            hotkey="s"
            setWindowState={this.setWindowState}
            windowStateName="systemPropertiesWindowState"
            taskbarStateName="systemPropertiesTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
            setMenuClosed={this.setMenuClosed}
            isStartMenuOpen={this.state.isStartMenuOpen}
          ></StartMenuItem>
          <StartMenuItem
            id="shutDown"
            image={{ backgroundImage: `url( ${ShutDownIcon})` }}
            style={{
              marginTop: "auto",
              borderTop: "1px solid grey",
              boxShadow: "0px -1px 1px rgba(255, 255, 255, 1)",
            }}
            label={
              <div className="start-menu-item-label">
                Sh<u>u</u>t Down...
              </div>
            }
            hotkey="u"
            setWindowState={this.setWindowState}
            windowStateName="shutDownWindowState"
            taskbarStateName="shutDownTaskbarState"
            addToStack={this.addToWindowStack}
            removeFromStack={this.removeFromWindowStack}
            moveToFront={this.moveWindowToFront}
            addToTaskbarStack={this.addToTaskbarStack}
            setMenuClosed={this.setMenuClosed}
            isStartMenuOpen={this.state.isStartMenuOpen}
          ></StartMenuItem>
        </StartMenu>
      </div>
    );
  }
}

export default ScreenHandler;
