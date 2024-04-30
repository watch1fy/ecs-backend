/**
@todo Enable sticky sessions and support for http polling
*/
import { Server } from "socket.io";
import { createServer } from "http";
import { Redis } from "ioredis";
import { createAdapter } from "@socket.io/redis-streams-adapter";

const REDIS_URL = process.env.UPSTASH_REDIS_URL as string;

export const httpServer = createServer();
export const redis = new Redis(REDIS_URL);

const ioServer = new Server({
  adapter: createAdapter(redis),
  cors: {
    allowedHeaders: "*",
    origin: [
      process.env.FRONT_END_DOMAIN as string,
      "https://admin.socket.io",
      "http://192.168.29.242:3000",
    ],
    credentials: true,
  },
  transports: ['websocket']
});

ioServer.attach(httpServer);

export default ioServer;
