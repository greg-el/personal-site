import React from "react";

interface IProps {
  url: string;
}

function IEIcon(props: IProps) {
  return (
    <div className="ie-icon-wrapper">
      <div
        className="ie-icon"
        style={{ backgroundImage: `url(${props.url})` }}
      ></div>
    </div>
  );
}

export default IEIcon;
