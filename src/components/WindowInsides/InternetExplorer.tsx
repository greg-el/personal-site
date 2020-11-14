import React, { ReactElement } from "react";
import IEToolbar from "../Window/InternetExplorer/IEToolbar";
import IEIcons from "../Window/InternetExplorer/IEIcons";

interface IProps {
  page: ReactElement;
  url: string;
}

function InternetExplorer(props: IProps) {
  return (
    <div className="ie-container">
      <IEToolbar />
      <IEIcons />
      <div className="ie-url-container">
        <div className="ie-url-address-label">Address:</div>
        <div className="ie-url-bar-wrapper">
          <input type="text" className="ie-url-bar" value={props.url}></input>
          <div className="open-in-browser-button-wrapper">
            <div
              className="open-in-browser-button"
              onClick={() => window.open(props.url, "_blank")}
            >
              Open In Browser
            </div>
          </div>
        </div>
      </div>
      <div className="ie-content-wrapper">{props.page}</div>
    </div>
  );
}

export default InternetExplorer;
