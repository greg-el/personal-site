import { ReactElement } from "react";

export enum WindowStateEnum {
  OPEN = "open",
  MINIMISED = "minimised",
  CLOSED = "closed",
}

export enum ScreenStateEnum {
  BOOT = "boot",
  DESKTOP = "desktop",
  SHUTDOWN = "shutdown",
  RESTART = "restart",
}

export enum CursorStateEnum {
  POINTER = "cursor.svg",
  RESIZE = "resize-cursor.svg",
  LOADING = "hourglass-cursor.svg",
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
