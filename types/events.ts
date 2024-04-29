import type { Socket } from "socket.io"

export type ChatEventNameType = 'event:message'
  | 'event:join-room'

export type SyncEventNameType = 'event:play'
  | 'event:pause'
  | 'event:play-fail'
  | 'event:seek'
  | 'event:waiting'
  | 'event:play'
  | 'event:rate-change'
  | 'event:join-room'

export type SyncInPayload = {
  room?: string,
  detail: {
    currentTime: number,
    playbackRate: number
  },
  toRoom: string
}

export interface SyncOutPayload {
  detail: {
    currentTime: number,
    playbackRate: number
  },
  from: string
}