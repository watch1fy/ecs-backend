import type { Namespace, Server } from "socket.io";
import type { ChatEventHandler } from "./event";
import SocketNamespace from "./socket";
import type {
  ChatInPayload,
  ChatC2SEvents,
  ChatS2CEvents,
  ChatS2SEvents,
  ChatSocket,
} from "types";

/**
 * @class
 * SocketIO 'chat' namespace that handles events sent to this namespace.
 */
class ChatNamespace extends SocketNamespace {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private _chatNsp: Namespace<ChatC2SEvents, ChatS2CEvents, ChatS2SEvents, any>;
  private _serverStarted: boolean = false;
  private static _instance: ChatNamespace | null = null;
  private _handlers: ChatEventHandler[];

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
    this._chatNsp = io.of("/chat");
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
  public addEventHandler(eventHander: ChatEventHandler) {
    if (this._serverStarted)
      throw new Error(
        "Events cannot be added after the server has started to listen for them",
      );
    this._handlers.push(eventHander);
  }

  /**
   * listen method adds all the events to the
   * namespace and starts listening for those events.
   * @method
   */
  public listen() {
    this._serverStarted = true;
    this._chatNsp.on("connection", (socket: ChatSocket) => {
      this._handlers.forEach((handler: ChatEventHandler) => {
        socket.on(
          handler.event,
          (payload: ChatInPayload, cb?: (msg: string) => void) => {
            handler.handle(socket, payload, cb);
          },
        );
      });
    });
  }
}

export default ChatNamespace;
