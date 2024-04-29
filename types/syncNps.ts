import type { Socket } from "socket.io"
import type { SyncInPayload, SyncOutPayload } from "./events"

/**
 * S2C -> Server to Client Events
 * @interface
 */
export interface SyncS2CEvents {
  'event:play': ({ detail, from }: SyncOutPayload, cb?: (msg: string) => void) => void,
  'event:pause': ({ detail, from }: SyncOutPayload, cb?: (msg: string) => void) => void,
  'event:play-fail': ({ detail, from }: SyncOutPayload, cb?: (msg: string) => void) => void,
  'event:seek': ({ detail, from }: SyncOutPayload, cb?: (msg: string) => void) => void,
  'event:waiting': ({ detail, from }: SyncOutPayload, cb?: (msg: string) => void) => void,
  'event:rate-change': ({ detail, from }: SyncOutPayload, cb?: (msg: string) => void) => void
}


/**
 * C2S -> Client to Server Events
 * @interface
 */
export interface SyncC2SEvents {
  'event:play': ({ detail, toRoom }: SyncInPayload, cb?: (msg: string) => void) => void,
  'event:pause': ({ detail, toRoom }: SyncInPayload, cb?: (msg: string) => void) => void,
  'event:play-fail': ({ detail, toRoom }: SyncInPayload, cb?: (msg: string) => void) => void,
  'event:seek': ({ detail, toRoom }: SyncInPayload, cb?: (msg: string) => void) => void,
  'event:waiting': ({ detail, toRoom }: SyncInPayload, cb?: (msg: string) => void) => void,
  'event:rate-change': ({ detail, toRoom }: SyncInPayload, cb?: (msg: string) => void) => void,
  'event:join-room': (room: string, cb?: (msg: string) => void) => void,
}


/**
 * S2S -> Server to Server Events
 * @interface
 */
export interface SyncS2SEvents {
  ping: () => void
}

/**
 * Empty Socket data
 * @todo
 * @interface
 */
export interface SyncSocketData { }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SyncSocket = Socket<SyncC2SEvents, SyncS2CEvents, SyncS2SEvents, any>
