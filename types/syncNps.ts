import type { Socket } from "socket.io"
import type { SyncInPayload, SyncOutPayload } from "./events"

/**
 * S2C -> Server to Client Events
 * @interface
 */
export interface SyncS2CEvents {
  'event:play': ({ detail, from }: SyncOutPayload, cb?: Function) => void,
  'event:pause': ({ detail, from }: SyncOutPayload, cb?: Function) => void,
  'event:play-fail': ({ detail, from }: SyncOutPayload, cb?: Function) => void,
  'event:seek': ({ detail, from }: SyncOutPayload, cb?: Function) => void,
  'event:waiting': ({ detail, from }: SyncOutPayload, cb?: Function) => void,
  'event:rate-change': ({ detail, from }: SyncOutPayload, cb?: Function) => void
}


/**
 * C2S -> Client to Server Events
 * @interface
 */
export interface SyncC2SEvents {
  'event:play': ({ detail, toRoom }: SyncInPayload, cb?: Function) => void,
  'event:pause': ({ detail, toRoom }: SyncInPayload, cb?: Function) => void,
  'event:play-fail': ({ detail, toRoom }: SyncInPayload, cb?: Function) => void,
  'event:seek': ({ detail, toRoom }: SyncInPayload, cb?: Function) => void,
  'event:waiting': ({ detail, toRoom }: SyncInPayload, cb?: Function) => void,
  'event:rate-change': ({ detail, toRoom }: SyncInPayload, cb?: Function) => void,
  'event:join-room': (room: string, cb: Function) => void,
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

export type SyncSocket = Socket<SyncC2SEvents, SyncS2CEvents, SyncS2SEvents, any>
