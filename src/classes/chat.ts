import type { Namespace, Server, Socket } from "socket.io";
import type EventHandler from "./event";
import SocketNamespace from "./socket";

/**
 * @class
 * SocketIO 'chat' namespace that handles events sent to this namespace.
*/
class ChatNamespace extends SocketNamespace {
  private _syncNsp: Namespace;
  private static _instance: ChatNamespace | null = null;
  private _handlers: EventHandler[];
  private CONNECTION: string = "connection" as const;

  /**
   * Constructor to chat namespace
   * @constructor
   * @param io
   * A socketIO server on which the 'chat' namespace will be created
   * @throws
   * Error is thown when trying to initialize the
   * chat namespace multiple times.
   */
  constructor(io: Server) {
    super();

    if (ChatNamespace._instance) {
      throw new Error("ChatNamespace can only be instantiated once.");
    }
    ChatNamespace._instance = this;
    this._syncNsp = io.of("/sync");
    this._handlers = [];
  }

  /**
   * This method returns the chat namespace instance
   * @method
   * @returns ChatNamespace instance.
   */
  get instance() {
    return ChatNamespace._instance;
  }

  /**
   * This method adds event to the chat namespace
   * @method
   * @param eventHander
   * An EventHandler instance that specifies an event and
   * a function that handles that event
   */
  public addEventHandler(eventHander: EventHandler) {
    this._handlers.push(eventHander);
  }

  /**
   * listen method adds all the events to the
   * namespace and starts listening for those events.
   * @method
   */
  public listen() {
    this._syncNsp.on(this.CONNECTION, (socket: Socket) => {
      this._handlers.forEach((handler: EventHandler) => {
        handler.handle(socket);
      });
    });
  }
}

export default ChatNamespace;
