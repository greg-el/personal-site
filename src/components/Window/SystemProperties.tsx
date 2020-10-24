import React from "react";

function SystemProperties() {
  return (
    <div id="sp-container">
      <div id="sp-pc-wrapper">
        <div id="sp-pc"></div>
      </div>
      <div id="sp-text-container">
        <div className="sp-section-container">
          <div id="sp-section-header">Tech:</div>
          <div className="sp-list-wrapper">
            <div className="sp-list-item-wrapper">
              <div className="sp-list-label-wrapper">
                <a className="sp-list-label" href="https://reactjs.org/">
                  React
                </a>
              </div>
            </div>
            <div className="sp-list-item-wrapper">
              <div className="sp-list-label-wrapper">
                <a
                  className="sp-list-label"
                  href="https://www.typescriptlang.org/"
                >
                  TypeScript
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="sp-section-container">
          <div className="sp-section-header">Libraries:</div>
          <div className="sp-list-wrapper">
            <div className="sp-list-item-wrapper">
              <div className="sp-list-label-wrapper">
                <a
                  className="sp-list-label"
                  href="https://github.com/STRML/react-resizable"
                >
                  react-resizable
                </a>
              </div>
            </div>
            <div className="sp-list-item-wrapper">
              <div className="sp-list-label-wrapper">
                <a
                  className="sp-list-label"
                  href="https://github.com/STRML/react-draggable"
                >
                  react-draggable
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="sp-section-container">
          <div className="sp-section-header">Tools:</div>
          <div className="sp-list-wrapper">
            <div className="sp-list-item-wrapper">
              <div className="sp-list-label-wrapper">
                <a className="sp-list-label" href="https://www.archlinux.org/">
                  Arch Linux
                </a>
              </div>
            </div>
            <div className="sp-list-item-wrapper">
              <div className="sp-list-label-wrapper">
                <a
                  className="sp-list-label"
                  href="https://github.com/VSCodium/vscodium"
                >
                  VSCodium
                </a>
              </div>
            </div>
            <div className="sp-list-item-wrapper">
              <div className="sp-list-label-wrapper">
                <a
                  className="sp-list-label"
                  href="http://software.schmorp.de/pkg/rxvt-unicode.html"
                >
                  rxvt-unicode
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="sp-section-container">
          <div className="sp-section-header">Hosting:</div>
          <div className="sp-list-wrapper">
            <div className="sp-list-item-wrapper">
              <div className="sp-list-element-icon-wrapper">
                <div className="sp-gitlab-icon sp-icon"></div>
              </div>
              <div className="sp-list-label-wrapper">
                <a
                  className="sp-list-label"
                  href="https://docs.gitlab.com/ee/user/project/pages/"
                >
                  GitLab Pages
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="sp-section-container">
          <div className="sp-section-header">Registered To:</div>
          <div className="sp-list-wrapper">
            <div className="sp-list-item-wrapper">
              <div className="sp-list-element-icon-wrapper">
                <div className="sp-github-icon sp-icon"></div>
              </div>
              <div className="sp-list-label-wrapper">
                <div className="sp-list-label">Greg Leonard</div>
              </div>
            </div>
            <div className="sp-list-wrapper">
              <div className="sp-list-item-wrapper">
                <div className="sp-list-element-icon-wrapper">
                  <div className="sp-github-icon sp-icon"></div>
                </div>
                <div className="sp-list-label-wrapper">
                  <a
                    className="sp-list-label"
                    href="mailto:gregjamesleonard@gmail.com"
                  >
                    gregjamesleonard@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemProperties;
