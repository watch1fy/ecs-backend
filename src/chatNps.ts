import type { Socket } from "socket.io";
import { ChatEventHandler, ChatNamespace } from "./classes";
import ioServer from "./socketio";

const chatNps = new ChatNamespace(ioServer);

chatNps.addEventHandler(
  new ChatEventHandler("event:join-room", (socket: Socket, room, cb) => {
    socket.join(room);
    if (cb)
      cb("joined room demo-party");
  }),
);

chatNps.addEventHandler(
  new ChatEventHandler("event:message", (socket: Socket, { detail, toRoom }, cb) => {
    socket.broadcast.to(toRoom).emit("message", { detail, from: socket.id });
    cb(`sent to ${toRoom} event play`);
  }),
);

export default chatNps;
