import React from "react";

function rn(from: number, to: number) {
  return ~~(Math.random() * (to - from + 1)) + from;
}

function rs(list: Array<string>) {
  return list[rn(1, list.length) - 1];
}

function boxShadows(max: number) {
  let ret = [];
  for (let i = 0; i < max; ++i) {
    ret.push(`
      ${rn(1, 100)}vw ${rn(1, 100)}vh ${rn(20, 40)}vmin ${rn(1, 20)}vmin
      ${rs(["#77ACD4", "#FFFFFF"])}
    `);
  }
  return ret.join(",");
}

function LogoShutDown() {
  return (
    <div id="shut-down-logo-container">
      <div id="shut-down-logo" style={{ zIndex: 2 }}></div>
      <div
        id="shut-down-cloud"
        style={{ boxShadow: boxShadows(100), zIndex: 1 }}
      ></div>
      <svg width="0">
        <filter id="filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".01"
            numOctaves="10"
          />
          <feDisplacementMap in="SourceGraphic" scale="400" />
        </filter>
      </svg>
    </div>
  );
}

export default LogoShutDown;
