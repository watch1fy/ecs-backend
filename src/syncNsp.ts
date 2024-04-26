import type { Socket } from "socket.io";
import { EventHandler, SyncNamespace } from "./classes";
import ioServer from "./socketio";

const syncNsp = new SyncNamespace(ioServer)

syncNsp.addEventHandler(new EventHandler('join-room', (socket: Socket, room, cb) => {
  socket.join(room);
  cb('joined room demo-party')
}))

syncNsp.addEventHandler(new EventHandler('play', (socket: Socket, { detail, toRoom }, cb) => {
  socket
    .broadcast
    .to(toRoom)
    .volatile
    .emit('event:play', { detail, from: socket.id })
  cb(`sent to ${toRoom} event play`)
}))

syncNsp.addEventHandler(new EventHandler('pause', (socket: Socket, { detail, toRoom }, cb) => {
  socket
    .broadcast
    .to(toRoom)
    .volatile
    .emit('event:pause', { detail, from: socket.id })
  cb(`sent to ${toRoom} event play`)
}))

syncNsp.addEventHandler(new EventHandler('play-fail', (socket: Socket, { detail, toRoom }, cb) => {
  socket
    .broadcast
    .to(toRoom)
    .volatile
    .emit('event:play-fail', { detail, from: socket.id })
  cb(`sent to ${toRoom} event play`)
}))

syncNsp.addEventHandler(new EventHandler('seek', (socket: Socket, { detail, toRoom }, cb) => {
  socket
    .broadcast
    .to(toRoom)
    .volatile
    .emit('event:seek', { detail, from: socket.id })
  cb(`sent to ${toRoom} event play`)
}))

syncNsp.addEventHandler(new EventHandler('waiting', (socket: Socket, { detail, toRoom }, cb) => {
  socket
    .broadcast
    .to(toRoom)
    .volatile
    .emit('event:waiting', { detail, from: socket.id })
  cb(`sent to ${toRoom} event play`)
}))

export default syncNsp;
