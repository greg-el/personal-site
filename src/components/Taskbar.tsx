import React from "react";

interface IState {}

interface IProps {
  focusedElement: any;
  setFocusedElement: any;
  id: string;
}

class Taskbar extends React.Component<IProps, IState> {
<<<<<<< HEAD
  constructor(props: IProps) {
    super(props);
  }
=======
>>>>>>> c4881b96d987562e99e61aa8cc90254213dfdf75

  render() {
    return (
      <div
        id={this.props.id}
        onClick={(e) => this.props.setFocusedElement(e.currentTarget)}
      >
        {this.props.children}
      </div>
    );
  }
}

export default Taskbar;
