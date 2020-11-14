import React from "react";

interface IProps {
  labelText: string;
}

function TitlebarLabel(props: IProps) {
  return (
    <div className="title-bar-label-wrapper">
      <div className="title-bar-label">{props.labelText}</div>
    </div>
  );
}

export default TitlebarLabel;
