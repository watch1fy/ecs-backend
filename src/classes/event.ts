import type { Socket } from "socket.io";

class EventHandler {
  private eventName: string;
  private handler: (socket: Socket, ...args: any) => void;
  constructor(
    eventName: string,
    handler: (socket: Socket, ...args: any) => void,
  ) {
    this.eventName = "event:" + eventName;
    this.handler = handler;
  }

  handle(socket: Socket) {
    socket.on(this.eventName, (...args) => this.handler(socket, ...args));
  }
}

export default EventHandler;
