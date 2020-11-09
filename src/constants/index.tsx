import { ReactElement } from "react";

export enum WindowStateEnum {
  OPEN = "open",
  MINIMISED = "minimised",
  CLOSED = "closed",
}

export enum ScreenStateEnum {
  BOOT = "boot",
  DESKTOP = "desktop",
  LOGOSHUTDOWN = "logoshutdown",
  SHUTDOWN = "shutdown",
  RESTART = "restart",
}

export enum CursorStateEnum {
  DEFAULT = "",
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

export interface Dimensions {
  width: number;
  height: number;
}

export interface Position {
  right: number;
  bottom: number;
}
