import React from "react";
import BootLine from "./BootLine";
import ScreenHandler from "./ScreenHandler";
import LogoShutDown from "./LogoShutDown";
import ShutDownScreen from "./ShutDownScreen";
import { ScreenStateEnum } from "../constants/index";

interface IProps {
  baseWait: number;
  bootText: Array<string>;
}

interface IState {
  screenState: ScreenStateEnum;
  endWait: number;
}

class ViewHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      screenState: ScreenStateEnum.BOOT,
      endWait: this.props.baseWait * this.props.bootText.length + 200 - 1,
    };

    this.setScreenState = this.setScreenState.bind(this);
  }

  _setEndWait() {
    setTimeout(
      () => this.setState({ screenState: ScreenStateEnum.DESKTOP }),
      this.state.endWait
    );
  }

  componentDidMount() {
    this._setEndWait();
  }

  setScreenState(val: ScreenStateEnum) {
    this.setState({ screenState: val });
  }

  render() {
    if (this.state.screenState === ScreenStateEnum.BOOT) {
      return (
        <div id="boot-wrapper">
          <div id="boot">
            {this.props.bootText.map((x, i) => {
              return (
                <BootLine key={i} text={x} waitTime={this.props.baseWait * i} />
              );
            })}
          </div>
        </div>
      );
    } else if (this.state.screenState === ScreenStateEnum.DESKTOP) {
      return <ScreenHandler setScreenState={this.setScreenState} />;
    } else if (this.state.screenState === ScreenStateEnum.LOGOSHUTDOWN) {
      return <LogoShutDown />;
    } else if (this.state.screenState === ScreenStateEnum.SHUTDOWN) {
      return <ShutDownScreen />;
    }
  }
}

export default ViewHandler;
