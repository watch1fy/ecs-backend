/**
TODO: Scaling and load balancing with redis
*/
import { createServer } from "http";
import SocketService from "./src/socketio";

const PORT = process.env.PORT ?? 8080
const httpServer = createServer();

const socketio = new SocketService();
socketio.io.attach(httpServer)
socketio.init()

httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));
