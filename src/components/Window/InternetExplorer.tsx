import React, { ReactElement } from "react";
import IEToolbar from "./IE-Components/IEToolbar";
import IEIcons from "./IE-Components/IEIcons";

interface IProps {
  page: ReactElement;
}

function InternetExplorer(props: IProps) {
  return (
    <div className="ie-container">
      <IEToolbar />
      <IEIcons />
      <div className="ie-url-container">
        <div className="ie-url-address-label">Address:</div>
        <input type="text" className="ie-url-bar"></input>
      </div>
      <div className="ie-content-wrapper">{props.page}</div>
    </div>
  );
}

export default InternetExplorer;
