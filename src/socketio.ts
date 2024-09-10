/**
@todo Enable sticky sessions and support for http polling
*/
import { Server } from "socket.io";
import { createServer, IncomingMessage, ServerResponse } from "http";
import { Redis } from "ioredis";
import { createAdapter } from "@socket.io/redis-adapter";

// Route to handle health checks
const healthRouteHandler = (
  req: IncomingMessage,
  res: ServerResponse<IncomingMessage> & {
    req: IncomingMessage;
  }
) => {
  if (req.method === 'GET' && req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(
      { message: 'SERVER HEALTHY' }
    ));
  }
  res.writeHead(400, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(
    { message: 'BAD REQUEST ON SOCKETIO SERVER' }
  ));
}
export const httpServer = createServer(healthRouteHandler);

// Redis adapter for socketIO
const REDIS_URL = process.env.REDIS_URL as string;
const pubClient = new Redis(REDIS_URL);
const subClient = pubClient.duplicate();

const ioServer = new Server({
  adapter: createAdapter(pubClient, subClient),
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
