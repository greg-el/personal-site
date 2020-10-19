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

/*
interface WindowProps {
  index: number;
  name: string;
  windowState: WindowStateEnum;
}

export const WindowObject = (props: WindowProps) => {
  const { index, name, windowState } = props;
};
*/
