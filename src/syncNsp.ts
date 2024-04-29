import type { Socket } from "socket.io";
import { SyncEventHandler, SyncNamespace } from "./classes";
import ioServer from "./socketio";

const syncNsp = new SyncNamespace(ioServer);

syncNsp.addEventHandler(
  new SyncEventHandler("event:join-room", (socket: Socket, { room }, cb) => {
    socket.join(room as string);
    if (cb && room)
      cb("joined room demo-party");
  }),
);

syncNsp.addEventHandler(
  new SyncEventHandler("event:play", (socket: Socket, { detail, toRoom }, cb) => {
    socket.broadcast
      .to(toRoom)
      .volatile.emit("event:play", { detail, from: socket.id });
    if (cb)
      cb(`sent to ${toRoom} event play`);
  }),
);

syncNsp.addEventHandler(
  new SyncEventHandler("event:pause", (socket: Socket, { detail, toRoom }, cb) => {
    socket.broadcast
      .to(toRoom)
      .volatile.emit("event:pause", { detail, from: socket.id });
    if (cb)
      cb(`sent to ${toRoom} event pause`);
  }),
);

syncNsp.addEventHandler(
  new SyncEventHandler("event:play-fail", (socket: Socket, { detail, toRoom }, cb) => {
    socket.broadcast
      .to(toRoom)
      .volatile.emit("event:play-fail", { detail, from: socket.id });
    if (cb)
      cb(`sent to ${toRoom} event play-fail`);
  }),
);

syncNsp.addEventHandler(
  new SyncEventHandler("event:seek", (socket: Socket, { detail, toRoom }, cb) => {
    socket.broadcast
      .to(toRoom)
      .volatile.emit("event:seek", { detail, from: socket.id });
    if (cb)
      cb(`sent to ${toRoom} event seek`);
  }),
);

syncNsp.addEventHandler(
  new SyncEventHandler("event:waiting", (socket: Socket, { detail, toRoom }, cb) => {
    socket.broadcast
      .to(toRoom)
      .volatile.emit("event:waiting", { detail, from: socket.id });
    if (cb)
      cb(`sent to ${toRoom} event waiting`);
  }),
);

syncNsp.addEventHandler(
  new SyncEventHandler("event:rate-change", (socket: Socket, { detail, toRoom }, cb) => {
    socket.broadcast
      .to(toRoom)
      .volatile.emit("event:rate-change", { detail, from: socket.id });
    if (cb)
      cb(`sent to ${toRoom} event rate-cahnge`);
  }),
);

export default syncNsp;
