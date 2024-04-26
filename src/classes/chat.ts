import type { Namespace, Server, Socket } from "socket.io";
import type EventHandler from "./event";
import SocketNamespace from "./socket";

class ChatNamespace extends SocketNamespace {
  private _syncNsp: Namespace;
  private static _instance: ChatNamespace | null = null;
  private _handlers: EventHandler[];
  private CONNECTION: string = 'connection' as const;

  constructor(io: Server) {
    super();

    if (ChatNamespace._instance) {
      throw new Error('ChatNamespace can only be instantiated once.')
    }
    ChatNamespace._instance = this;
    this._syncNsp = io.of('/sync');
    this._handlers = []
  }

  get instance() {
    return ChatNamespace._instance;
  }

  public addEventHandler(eventHander: EventHandler) {
    this._handlers.push(eventHander);
  }

  public listen() {
    this._syncNsp.on(this.CONNECTION, (socket: Socket) => {
      this._handlers.forEach((handler: EventHandler) => {
        handler.handle(socket);
      })
    })
  }
}

export default ChatNamespace;
