import React from "react";

interface IState {
  didYouKnowText: string;
}

interface IProps {}

class DidYouKnow extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      didYouKnowText: this.randomDidYouKnow(),
    };
  }

  randomDidYouKnow() {
    let didYouKnows = [
      "You should hire me as a dev",
      "To open a program, you just click the Start button, and then click the program's icon",
    ];

    return didYouKnows[Math.floor(Math.random() * didYouKnows.length)];
  }

  render() {
    return (
      <div id="dyk-container">
        <div id="dyk-icon-wrapper">
          <div id="dyk-icon"></div>
        </div>
        <div id="dyk-main-wrapper">
          <div id="dyk-text-wrapper">
            <div id="dyk-did-you-know-message">Did you know...</div>
            <div id="dyk-text">{this.state.didYouKnowText}</div>
          </div>
          <div id="dyk-pc-wrapper">
            <div id="dyk-pc"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default DidYouKnow;
