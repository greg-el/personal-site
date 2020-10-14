import React from "react";
import BootLine from "./BootLine";
import ScreenHandler from "./ScreenHandler";

interface IProps {
  baseWait: number;
  bootText: Array<string>;
}

interface IState {
  bootScreenFinished: boolean;
  endWait: number;
}

class ViewHandler extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      bootScreenFinished: false,
      endWait: this.props.baseWait * this.props.bootText.length + 200 - 1,
    };
  }

  _setEndWait() {
    setTimeout(
      () => this.setState({ bootScreenFinished: true }),
      this.state.endWait
    );
  }

  componentDidMount() {
    this._setEndWait();
  }

  render() {
    if (this.state.bootScreenFinished === false) {
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
    } else {
      return <ScreenHandler />;
    }
  }
}

export default ViewHandler;
