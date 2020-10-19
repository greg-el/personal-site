export enum WindowStateEnum {
  OPEN = "open",
  MINIMISED = "minimised",
  CLOSED = "closed",
}

export class WindowStateObject {
  index: number;
  name: string;
  state: WindowStateEnum;

  constructor(index: number, name: string, state: WindowStateEnum) {
    this.index = index;
    this.name = name;
    this.state = state;
  }
}
