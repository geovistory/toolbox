import {Constructor, Context} from '@loopback/context';
import * as http from 'http';
import {Server, ServerOptions, Socket} from 'socket.io';
import {getWebSocketMetadata} from '../../decorators/websocket.decorator';
import {WebSocketControllerFactory} from './websocket-controller-factory';
import SocketIOServer = require('socket.io');

const debug = require('debug')('loopback:websocket');

/* eslint-disable @typescript-eslint/no-explicit-any */
export type SockIOMiddleware = (
  socket: Socket,
  fn: (err?: any) => void,
) => void;

/**
 * A websocket server
 */
export class WebSocketServer extends Context {
  private io: Server;

  constructor(
    private ctx: Context,
    // public readonly httpServer: HttpServer,
    private options: ServerOptions = {},
  ) {
    super();
    this.io = SocketIOServer(options);
  }

  /**
   * Register a sock.io middleware function
   * @param fn
   */
  use(fn: SockIOMiddleware) {
    return this.io.use(fn);
  }

  /**
   * Register a websocket controller
   * @param controllerClass
   * @param namespace
   */
  route(controllerClass: Constructor<any>, namespace?: string | RegExp) {
    if (namespace == null) {
      const meta = getWebSocketMetadata(controllerClass);
      namespace = meta?.namespace
    }

    const nsp = namespace ? this.io.of(namespace) : this.io;
    /* eslint-disable @typescript-eslint/no-misused-promises */
    nsp.on('connection', async socket => {
      debug(
        'Websocket connected: id=%s namespace=%s',
        socket.id,
        socket.nsp.name,
      );
      // Create a request context
      // const reqCtx = new Context(this.ctx);
      // Bind websocket
      // reqCtx.bind('ws.socket').to(socket);
      this.ctx.bind('ws.socket').to(socket);
      // Instantiate the controller instance
      await new WebSocketControllerFactory(this.ctx, controllerClass).create(
        socket,
      );
    });
    return nsp;
  }

  /**
   * Start the websocket server
   */
  async start(server: http.Server) {
    // await this.httpServer.start();
    // FIXME: Access HttpServer.server
    // const server = (this.httpServer as any).server;
    this.io.attach(server, this.options);
  }

  /**
   * Stop the websocket server
   */
  async stop() {
    const close = new Promise<void>((resolve, reject) => {
      this.io.close(() => {
        resolve();
      });
    });
    await close;
    // await this.httpServer.stop();
  }
}
