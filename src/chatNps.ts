import type { Socket } from "socket.io";
import { EventHandler, ChatNamespace } from "./classes";
import ioServer from "./socketio";

const chatNps = new ChatNamespace(ioServer);

chatNps.addEventHandler(
  new EventHandler("join-room", (socket: Socket, room, cb) => {
    socket.join(room);
    cb("joined room demo-party");
  }),
);

chatNps.addEventHandler(
  new EventHandler("message", (socket: Socket, { detail, toRoom }, cb) => {
    socket.broadcast.to(toRoom).emit("event:play", { detail, from: socket.id });
    cb(`sent to ${toRoom} event play`);
  }),
);

export default chatNps;
