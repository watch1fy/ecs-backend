import { Server } from "socket.io";
import { createServer } from "http";

export const httpServer = createServer();

const ioServer = new Server({
  cors: {
    allowedHeaders: "*",
    origin: [
      process.env.FRONT_END_DOMAIN as string,
      "https://admin.socket.io",
      "http://192.168.29.242:3000",
    ],
    credentials: true,
  },
});

ioServer.attach(httpServer);

export default ioServer;
