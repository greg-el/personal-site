import React from "react";

interface IState {
  display: boolean;
}

interface IProps {
  startMouseDown: boolean;
  onStartMouseDown: any;
  desktopMouseDown: boolean;
  onDesktopMouseDown: any;
}

class StartMenu extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      display: false,
    };
  }

  componentDidUpdate(prevProps: IProps) {
    if (
      this.state.display === false &&
      prevProps.startMouseDown !== this.props.startMouseDown
    ) {
      this.setState({
        display: true,
      });
    }
    if (
      this.state.display === true &&
      prevProps.desktopMouseDown !== this.props.desktopMouseDown
    ) {
      this.setState({
        display: false,
      });
    }
  }

  render() {
    if (this.state.display === true) {
      return (
        <div id="start-menu-wrapper">
          <div id="start-menu"></div>
        </div>
      );
    } else {
      return "";
    }
  }
}

export default StartMenu;
