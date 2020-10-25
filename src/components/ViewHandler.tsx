import React from "react";
import BootLine from "./BootLine";
import ScreenHandler from "./ScreenHandler";
import ShutDownScreen from "./ShutDownScreen";
import { CursorStateEnum, ScreenStateEnum } from "../constants/index";

interface IProps {
  baseWait: number;
  bootText: Array<string>;
}

interface IState {
  screenState: ScreenStateEnum;
  endWait: number;
  cursor: CursorStateEnum;
}

class ViewHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      cursor: CursorStateEnum.POINTER,
      screenState: ScreenStateEnum.BOOT,
      endWait: this.props.baseWait * this.props.bootText.length + 200 - 1,
    };

    this.setScreenState = this.setScreenState.bind(this);
    this.setCursor = this.setCursor.bind(this);
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

  setCursor(val: CursorStateEnum) {
    this.setState({ cursor: val });
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
      return (
        <ScreenHandler
          cursor={this.state.cursor}
          setCursor={this.setCursor}
          setScreenState={this.setScreenState}
        />
      );
    } else if (this.state.screenState === ScreenStateEnum.SHUTDOWN) {
      return <ShutDownScreen />;
    }
  }
}

export default ViewHandler;
