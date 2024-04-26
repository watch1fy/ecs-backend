import type { Namespace, Server, Socket } from "socket.io";
import type { EventHandler } from ".";
import SocketNamespace from "./socket";

/**
 * @class
 * SocketIO 'sync' namespace that handles events sent to this namespace.
*/
class SyncNamespace extends SocketNamespace {
  private _syncNsp: Namespace;
  private static _instance: SyncNamespace | null = null;
  private _handlers: EventHandler[];
  private CONNECTION: string = "connection" as const;

  /**
   * Constructor to sync namespace
   * @constructor
   * @param io
   * A socketIO server on which the 'sync' namespace will be created
   * @throws
   * Error is thown when trying to initialize the
   * sync namespace multiple times.
   */
  constructor(io: Server) {
    super();

    if (SyncNamespace._instance) {
      throw new Error("SyncNamespace can only be instantiated once.");
    }
    SyncNamespace._instance = this;
    this._syncNsp = io.of("/sync");
    this._handlers = [];
  }

  /**
   * This method returns the sync namespace instance
   * @method
   * @returns SyncNamespace instance.
   */
  get instance() {
    return SyncNamespace._instance;
  }

  /**
   * This method adds event to the sync namespace
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

export default SyncNamespace;
