import ioServer, { httpServer } from "@/socketio";
import syncNsp from "@/syncNsp";
import chatNps from "@/chatNps";
import { instrument } from "@socket.io/admin-ui";

const PORT = process.env.NODE_ENV === 'production' ? 80 : (process.env.PORT ?? 8080);

syncNsp.listen();
chatNps.listen();

instrument(ioServer, { auth: false });
httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));
