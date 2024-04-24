/**
TODO: Scaling and load balancing with redis
*/
import { createServer } from "http";
import SocketService from "./src/socketio";
import { instrument } from "@socket.io/admin-ui";

const PORT = process.env.PORT ?? 8080
const httpServer = createServer();

const socketio = new SocketService();
socketio.io.attach(httpServer)
socketio.init()

instrument(socketio.io, { auth: false })

httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));
