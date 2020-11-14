import React from "react";

interface IState {}

interface IProps {}

class AboutMe extends React.Component<IProps, IState> {
  render() {
    return (
      <div id="about-me-container">
        <div id="about-me-wrapper">
          <div id="about-me"></div>
        </div>
      </div>
    );
  }
}

export default AboutMe;
