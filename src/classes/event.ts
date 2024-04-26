import type { Socket } from "socket.io";

/**
 * @class
 * EventHandler is a class that handles event when added to socket namespace
*/
class EventHandler {
  private eventName: string;
  private handler: (socket: Socket, ...args: any) => void;

  /**
   * Constructor to chat namespace
   * @constructor
   * @param eventName
   * eventName is a string that corresponds to the event to listen for.
   * Every event name is automatically prefixed with 'event:'.
   * @param handler
   * handler if a function that takes Socket object and arbitrary message that comes from client
   * and is executed when the 'eventName' occurs.
   */
  constructor(
    eventName: string,
    handler: (socket: Socket, ...args: any) => void,
  ) {
    this.eventName = "event:" + eventName;
    this.handler = handler;
  }

  /**
   * Listens and handles the event
   * @param socket
   * A Socket obejct that is used to listen and execute the handler
   */
  public handle(socket: Socket) {
    socket.on(this.eventName, (...args) => this.handler(socket, ...args));
  }
}

export default EventHandler;
