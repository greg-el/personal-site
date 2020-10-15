import React from "react";

interface IState {
  focused: boolean;
}

interface IProps {
  style: React.CSSProperties;
  label: string;
  url: string;
  id: string;
  focusedElement: any;
  setFocusedElement: any;
}

class Icon extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      focused: false,
    };
  }

  componentDidUpdate() {
    if (
      this.props.focusedElement !== this.props.id &&
      this.state.focused === true
    ) {
      this.setState({
        focused: false,
      });
    }
  }

  _handleSingleClick(event: any) {
    let target = event.currentTarget;
    this.props.setFocusedElement(target);
    event.stopPropagation();
    this.setState({
      focused: true,
    });
  }

  render() {
    let setClassName =
      this.state.focused === true ? "icon-focused" : "icon-not-focused";
    return (
      <div
        id={this.props.id}
        className={"icon-wrapper " + setClassName}
        onDoubleClick={() => window.open(this.props.url, "_blank")}
        onClick={(e) => this._handleSingleClick(e)}
      >
        <div className="icon" style={this.props.style}></div>
        <div className="icon-label">{this.props.label}</div>
      </div>
    );
  }
}

export default Icon;
