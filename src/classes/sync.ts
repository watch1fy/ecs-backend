import type { Namespace, Server, Socket } from "socket.io";
import type { EventHandler } from ".";
import SocketNamespace from "./socket";

class SyncNamespace extends SocketNamespace {
  private _syncNsp: Namespace;
  private static _instance: SyncNamespace | null = null;
  private _handlers: EventHandler[];
  private CONNECTION: string = "connection" as const;

  constructor(io: Server) {
    super();

    if (SyncNamespace._instance) {
      throw new Error("SyncNamespace can only be instantiated once.");
    }
    SyncNamespace._instance = this;
    this._syncNsp = io.of("/sync");
    this._handlers = [];
  }

  get instance() {
    return SyncNamespace._instance;
  }

  public addEventHandler(eventHander: EventHandler) {
    this._handlers.push(eventHander);
  }

  public listen() {
    this._syncNsp.on(this.CONNECTION, (socket: Socket) => {
      this._handlers.forEach((handler: EventHandler) => {
        handler.handle(socket);
      });
    });
  }
}

export default SyncNamespace;
