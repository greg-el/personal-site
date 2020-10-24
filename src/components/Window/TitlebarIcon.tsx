import React from "react";

interface IProps {
  icon: React.CSSProperties;
}

function TitlebarIcon(props: IProps) {
  return (
    <div className="title-bar-icon-wrapper">
      <div style={props.icon} className="title-bar-icon"></div>
    </div>
  );
}

export default TitlebarIcon;
