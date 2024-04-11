import { Server, Socket } from "socket.io";

class SocketService {
  private _io: Server;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: '*',
        origin: process.env.FRONT_END_DOMAIN,
        credentials: true
      }
    })
  }

  public init() {
    if (!this._io) {
      throw new Error('Socket IO service not initialized')
    }

    this._io.on('connection', (socket: Socket) => {
      console.log(socket.id)
    })
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
