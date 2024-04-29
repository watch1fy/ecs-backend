import { Namespace, type Server, type Socket } from "socket.io";
import { SyncEventHandler } from ".";
import SocketNamespace from "./socket";
import type { SyncC2SEvents, SyncS2CEvents, SyncS2SEvents } from "types";
import type { SyncInPayload } from "types";

/**
 * @class
 * SocketIO 'sync' namespace that handles events sent to this namespace.
 */
class SyncNamespace extends SocketNamespace {
  private static _instance: SyncNamespace | null = null;
  private _syncNsp: Namespace<SyncC2SEvents, SyncS2CEvents, SyncS2SEvents, any>;
  private _handlers: SyncEventHandler[];
  private _serverStarted: boolean = false;

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
    this._handlers = []
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
  public addEventHandler(eventHandler: SyncEventHandler) {
    if (this._serverStarted) {
      throw new Error('Cannot add events after ')
    }
    this._handlers.push(eventHandler);
  }

  /**
   * listen method adds all the events to the
   * namespace and starts listening for those events.
   * @method
   */
  public listen() {
    this._serverStarted = true;
    this._syncNsp.on('connection', (socket: Socket) => {
      this._handlers.forEach((handler: SyncEventHandler) => {
        socket.on(handler.event, (payload: SyncInPayload, cb?: Function) => {
          handler.handle(socket, payload, cb)
        })
      });
    });
  }
}

export default SyncNamespace;
