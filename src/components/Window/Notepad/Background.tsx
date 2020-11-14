import React from "react";

interface IState {}

interface IProps {}

class Notepad extends React.Component<IProps, IState> {
  render() {
    return (
      <div id="notepad-text-wrapper">
        <div id="notepad-text">
          Hey,
          <p>I'm Greg, a programmer from Hampshire.</p>
          <p>
            Whilst exploring this site, you will come across a variety of
            projects I have worked on, both solo and collaborative.
          </p>
          <p>
            <a href="https://candid.hr">Candid</a> is a small startup I've been
            working on with some friends, with the goal of showing candidates
            what it'll really be like to work at a company and how they'll
            actually be compensated. Powered by verified and anonymous insights
            from current and former employees.
          </p>
          <p>
            My{" "}
            <a href="https://ac-guide.herokuapp.com">
              Animal Crossing: New Horizons Assistant
            </a>{" "}
            I created this as my first full stack project. Its main purpose was
            to condense information from the wiki into a visual, up-to-date view
            on what activities are currently available within the game.
          </p>
          <p>
            I'm always interested in learning new technologies/concepts. At the
            moment I'm learning Rust! Most of the languages I'm familiar with
            are quite high level, so I've set out to learn a lower level
            language, to get a deeper understanding of what is happening behind
            the scenes.
          </p>
          <p>
            If you'd like to get in contact, drop me an{" "}
            <a href="mailto:gregjamesleonard@gmail.co.uk">email</a>.
          </p>
          <p>Cheers</p>
        </div>
      </div>
    );
  }
}

export default Notepad;
