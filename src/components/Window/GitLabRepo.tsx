import React from "react";

interface IProps {
  data: any;
  isLoaded: boolean;
}

interface IState {
  barDivs: JSX.Element[] | null;
  languageKeys: JSX.Element[] | null;
  languages: any;
  gotLanguages: boolean;
}

interface ILangColours {
  TypeScript: string;
  JavaScript: string;
  CSS: string;
  HTML: string;
  Python: string;
  Rust: string;
  Ruby: string;
  [key: string]: string;
}

class GitLabRepo extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      barDivs: null,
      languageKeys: null,
      languages: null,
      gotLanguages: false,
    };
  }

  async getGitLabRepoLanguages(repoId: any) {
    let out: [string, any][] = [];
    await fetch(`https://gitlab.com/api/v4/projects/${repoId}/languages`, {
      method: "GET",
    }).then(async (data) => {
      await data.json().then((result) => {
        for (let lang of Object.entries(result)) {
          out.push([lang[0], lang[1]]);
        }
      });
    });
    return out;
  }

  getLanguageColour(name: string) {
    let colours: ILangColours = {
      TypeScript: "#2f74c0",
      JavaScript: "#f0db4f",
      CSS: "#563d7c",
      HTML: "#e44d26",
      Python: "#3572a5",
      Rust: "#dea584",
      Ruby: "#ff0103",
    };
    return colours[name];
  }

  createBarDivs(languages: any): JSX.Element[] {
    return languages.map((elem: any, i: number) => {
      return (
        <div
          key={i}
          className="language-bar-elem"
          style={{
            width: elem[1] + "%",
            backgroundColor: this.getLanguageColour(elem[0]),
          }}
        ></div>
      );
    });
  }

  createLanguageKey(languages: any): JSX.Element[] {
    return languages.map((elem: any, i: number) => {
      return (
        <div key={i + "hub"} className="language-key-container">
          <div className="language-key-colour-wrapper">
            <div
              className="language-key-colour"
              style={{
                backgroundColor: this.getLanguageColour(elem[0]),
              }}
            ></div>
          </div>
          <div className="language-key-label-wrapper">
            <div className="language-key-label">{elem[0]}</div>
          </div>
        </div>
      );
    });
  }

  async getLanguages() {
    this.setState(
      {
        languages: await this.getGitLabRepoLanguages(this.props.data.id),
        gotLanguages: true,
      },
      () => {
        this.setState({
          barDivs: this.createBarDivs(this.state.languages),
          languageKeys: this.createLanguageKey(this.state.languages),
        });
      }
    );
  }

  render() {
    if (!this.state.gotLanguages && this.props.isLoaded) {
      this.getLanguages();
    }
    return (
      <div
        className="repo-wrapper"
        onClick={() => window.open(this.props.data.url, "_blank")}
      >
        <div className="repo-title-wrapper">
          <div className="repo-title-logo-wrapper">
            <div className="repo-title-logo">{this.props.data.name}</div>
          </div>
          <div className="repo-title-label-wrapper">
            <div className="repo-title-label"></div>
          </div>
        </div>
        <div className="repo-description-wrapper">
          <div className="repo-description">{this.props.data.description}</div>
        </div>
        <div className="repo-language-wrapper">
          <div className="repo-language-bar">{this.state.barDivs}</div>
          <div className="repo-language-keys-container">
            {this.state.languageKeys}
          </div>
        </div>
      </div>
    );
  }
}

export default GitLabRepo;
