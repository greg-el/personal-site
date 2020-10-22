import { ReactElement } from "react";

export enum WindowStateEnum {
  OPEN = "open",
  MINIMISED = "minimised",
  CLOSED = "closed",
}

export class WindowObject {
  index: number;
  name: string;
  windowState: WindowStateEnum;
  element: ReactElement;

  constructor(
    index: number,
    name: string,
    windowState: WindowStateEnum,
    element: ReactElement
  ) {
    this.index = index;
    this.name = name;
    this.windowState = windowState;
    this.element = element;
  }
}

export interface ResizeProps {
  width: number;
  height: number;
  handleSize: [number, number];
  minConstraints: [number, number];
  resizeHandles: Array<any>;
  className: string;
  handle: Function;
}
