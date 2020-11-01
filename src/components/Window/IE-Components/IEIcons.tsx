import React from "react";
import IeIcon from "./IeIcon";
import IeOpenIcon from "../../../image/icons/ie/ie-open-icon.svg";
import IePrintIcon from "../../../image/icons/ie/ie-print-icon.svg";
import IeEmailIcon from "../../../image/icons/ie/ie-email-icon.svg";
import IeBackIcon from "../../../image/icons/ie/ie-back-icon.svg";
import IeForwardIcon from "../../../image/icons/ie/ie-forward-icon.svg";
import IeStopIcon from "../../../image/icons/ie/ie-stop-icon.svg";
import IeRefreshIcon from "../../../image/icons/ie/ie-refresh-icon.svg";
import IeHomeIcon from "../../../image/icons/ie/ie-home-icon.svg";
import IeSearchIcon from "../../../image/icons/ie/ie-search-icon.svg";
import IePaperIcon from "../../../image/icons/ie/ie-paper-icon.svg";
import IeShortcutFolderIcon from "../../../image/icons/ie/ie-shortcut-folder-icon.svg";
import IeAddShortcutIcon from "../../../image/icons/ie/ie-add-shortcut-icon.svg";
import IeCutIcon from "../../../image/icons/ie/ie-cut-icon.svg";
import IeCopyIcon from "../../../image/icons/ie/ie-copy-icon.svg";
import IePasteIcon from "../../../image/icons/ie/ie-paste-icon.svg";

function InternetExplorerIcons() {
  return (
    <div className="ie-icons-wrapper-container">
      <div className="ie-icons-wrapper">
        <IeIcon url={IeOpenIcon} />
        <IeIcon url={IePrintIcon} />
        <IeIcon url={IeEmailIcon} />
      </div>
      <div className="ie-icons-wrapper">
        <IeIcon url={IeBackIcon} />
        <IeIcon url={IeForwardIcon} />
      </div>
      <div className="ie-icons-wrapper">
        <IeIcon url={IeStopIcon} />
        <IeIcon url={IeRefreshIcon} />
      </div>
      <div className="ie-icons-wrapper">
        <IeIcon url={IeHomeIcon} />
        <IeIcon url={IeSearchIcon} />
        <IeIcon url={IePaperIcon} />
      </div>
      <div className="ie-icons-wrapper">
        <IeIcon url={IeShortcutFolderIcon} />
        <IeIcon url={IeAddShortcutIcon} />
      </div>
      <div className="ie-icons-wrapper">
        <IeIcon url={IeCutIcon} />
        <IeIcon url={IeCopyIcon} />
        <IeIcon url={IePasteIcon} />
      </div>
      <div className="ie-icons-wrapper" id="ie-icons-wrapper-padder"></div>
    </div>
  );
}

export default InternetExplorerIcons;
