/**
TODO: Scaling and load balancing with redis
*/
import ioServer, { httpServer } from "@/socketio";
import syncNsp from "@/syncNsp";
import chatNps from "@/chatNps";
import { instrument } from "@socket.io/admin-ui";

const PORT = process.env.PORT ?? 8080

syncNsp.listen();
chatNps.listen();

instrument(ioServer, { auth: false })
httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));
