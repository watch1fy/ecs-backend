import { ChatEventHandler, ChatNamespace } from "./classes";
import ioServer from "./socketio";
import type { ChatInPayload, ChatSocket } from "types";

const chatNps = new ChatNamespace(ioServer);

chatNps.addEventHandler(
  new ChatEventHandler("event:join-room", (socket: ChatSocket, { room }: ChatInPayload, cb) => {
    socket.join(room as string);
    if (cb && room)
      cb("joined room demo-party");
  }),
);

chatNps.addEventHandler(
  new ChatEventHandler("event:message", (socket: ChatSocket, { message, toRoom }: ChatInPayload, cb) => {
    socket.broadcast.to(toRoom).emit("event:message", { message, from: socket.id });
    if (cb)
      cb(`sent to message ${toRoom}`);
  }),
);

export default chatNps;
