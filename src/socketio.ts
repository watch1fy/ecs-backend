import { Namespace, Server, Socket } from "socket.io";

class SocketService {
  private _io: Server;
  private _syncNsp: Namespace;

  constructor() {
    this._io = new Server({
      cors: {
        allowedHeaders: '*',
        origin: [
          process.env.FRONT_END_DOMAIN as string,
          'https://admin.socket.io',
          "http://192.168.29.242:3000"
        ],
        credentials: true
      }
    });

    this._syncNsp = this._io.of('/sync');
  }

  public emitSyncEventToRoom(event: string, room: string, namespace: string = '/') {
    this._syncNsp.to(room).emit(event);
  }

  public init() {
    if (!this._io) {
      throw new Error('Socket IO service not initialized');
    }

    this._io.on('connection', (socket: Socket) => {
      console.log(socket.id);
    });

    this._syncNsp.on('connection', (socket: Socket) => {
      socket.on('join-room', (room, cb) => {
        socket.join(room);
        cb('joined room demo-party')
      })
      socket.on('event:play', ({ detail, toRoom }, cb): any => {
        console.log(detail, toRoom, 'play')
        socket.broadcast.to(toRoom).emit('event:play', { detail, from: socket.id })
        cb(`sent to ${toRoom} event play`)
      });
      socket.on('event:pause', ({ detail, toRoom }, cb): any => {
        console.log(detail, toRoom, 'pause')
        socket.broadcast.to(toRoom).emit('event:pause', { detail, from: socket.id })
        cb(`sent to ${toRoom} event pause`)
      });
      socket.on('event:seek', ({ detail, toRoom }, cb): any => {
        console.log(detail, toRoom, 'seek')
        socket.broadcast.to(toRoom).emit('event:seek', { detail, from: socket.id })
        cb(`sent to ${toRoom} event seek`)
      });
      socket.on('event:waiting', ({ detail, toRoom }, cb): any => {
        console.log(detail, toRoom, 'waiting')
        socket.broadcast.to(toRoom).emit('event:waiting', { detail, from: socket.id })
        cb(`sent to ${toRoom} event waiting`)
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
