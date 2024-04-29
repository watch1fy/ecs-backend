import type { Socket } from "socket.io";
import type { ChatEventNameType, ChatSocket, SyncSocket } from "types";
import type { SyncEventNameType } from "types";
import type { SyncInPayload } from "types";
import type { ChatInPayload } from "types/events";

/**
 * @class
 * ChatEventHandler is a class that handles event when added to chat namespace
 */
export class ChatEventHandler {
  private eventName: ChatEventNameType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private handler: (socket: ChatSocket, payload: ChatInPayload, cb?: Function) => void;

  /**
   * Constructor to chat namespace
   * @constructor
   * @param eventName
   * eventName is a string that corresponds to the event to listen for in chat namespace.
   * @param handler
   * handler if a function that takes Socket object and arbitrary message that comes from client
   * and is executed when the 'eventName' occurs.
   */
  constructor(
    eventName: ChatEventNameType,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handler: (socket: ChatSocket, payload: ChatInPayload, cb?: Function) => void,
  ) {
    this.eventName = eventName;
    this.handler = handler;
  }

  /**
   * Listens and handles the event
   * @param socket
   * A Socket obejct that is used to listen and execute the handler
   */
  public handle(socket: ChatSocket, payload: ChatInPayload, cb?: Function) {
    this.handler(socket, payload, cb);
  }

  get event() {
    return this.eventName
  }

  get eventHandler() {
    return this.handler
  }
}

/**
 * @class
 * SyncEventHandler is a class that handles event when added to sync namespace
 */
export class SyncEventHandler {
  private eventName: SyncEventNameType;
  private handler: (socket: SyncSocket, payload: SyncInPayload, cb: Function | undefined) => void;

  /**
   * Constructor to chat namespace
   * @constructor
   * @param eventName
   * eventName is a string that corresponds to the event to listen for in sync namespace.
   * @param handler
   * handler is a function that takes Socket object and arbitrary message that comes from client
   * and is executed when the 'eventName' occurs.
   */
  constructor(
    eventName: SyncEventNameType,
    handler: (socket: SyncSocket, payload: SyncInPayload, cb: Function | undefined) => void,
  ) {
    this.eventName = eventName;
    this.handler = handler;
  }

  /**
   * Listens and handles the event
   * @param socket
   * A Socket obejct that is used to listen and execute the handler
   */
  public handle(socket: SyncSocket, payload: SyncInPayload, cb?: Function) {
    this.handler(socket, payload, cb);
  }

  get event() {
    return this.eventName
  }

  get eventHandler() {
    return this.handler
  }
}
