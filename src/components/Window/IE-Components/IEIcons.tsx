import React from "react";
import IeOpenIcon from "../../../image/icons/ie/ie-open-icon.svg";
import IePrintIcon from "../../../image/icons/ie/ie-print-icon.svg";
import IeEmailIcon from "../../../image/icons/ie/ie-email-icon.svg";
import IeBackIcon from "../../../image/icons/ie/ie-back-icon.svg";
import IeForwardIcon from "../../../image/icons/ie/ie-forward-icon.svg";

function InternetExplorerIcons() {
  return (
    <div className="ie-icons-wrapper-container">
      <div className="ie-icons-wrapper">
        <div className="ie-icon-wrapper">
          <div
            className="ie-icon"
            style={{ backgroundImage: `url(${IeOpenIcon})` }}
          ></div>
        </div>
        <div className="ie-icon-wrapper">
          <div
            className="ie-icon"
            style={{ backgroundImage: `url(${IePrintIcon})` }}
          ></div>
        </div>
        <div className="ie-icon-wrapper">
          <div
            className="ie-icon"
            style={{ backgroundImage: `url(${IeEmailIcon})` }}
          ></div>
        </div>
      </div>
      <div className="ie-icons-wrapper">
        <div className="ie-icon-wrapper">
          <div
            className="ie-icon"
            style={{ backgroundImage: `url(${IeBackIcon})` }}
          ></div>
        </div>
        <div className="ie-icon-wrapper">
          <div
            className="ie-icon"
            style={{ backgroundImage: `url(${IeForwardIcon})` }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default InternetExplorerIcons;
