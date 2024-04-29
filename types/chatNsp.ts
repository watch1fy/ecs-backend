import type { Socket } from "socket.io";
import type { ChatInPayload, ChatOutPayload } from "./events";

/**
 * S2C -> Server to Client Events
 * @interface
 */
export interface ChatS2CEvents {
  "event:message": (
    { message, from }: ChatOutPayload,
    cb?: (msg: string) => void,
  ) => void;
}

/**
 * C2S -> Client to Server Events
 * @interface
 */
export interface ChatC2SEvents {
  "event:message": (
    { message, toRoom }: ChatInPayload,
    cb?: (msg: string) => void,
  ) => void;
  "event:join-room": (room: string, cb?: (msg: string) => void) => void;
}

/**
 * S2S -> Server to Server Events
 * @interface
 */
export interface ChatS2SEvents {
  ping: () => void;
}

/**
 * Empty Socket data
 * @todo
 * @interface
 */
export interface ChatSocketData {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ChatSocket = Socket<
  ChatC2SEvents,
  ChatS2CEvents,
  ChatS2SEvents,
  any
>;
