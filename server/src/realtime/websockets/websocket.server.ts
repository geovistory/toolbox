import {Constructor, Context} from '@loopback/context';
import * as http from 'http';
import {Server, Socket} from 'socket.io';
import {SysStatusController, WarEntityPreviewController} from '../../controllers';
import {ImportTableController} from '../../controllers/import-table.controller';
import {FieldChangeController} from '../../controllers/project-data/field-change.controller';
import {getWebSocketMetadata} from '../../decorators/websocket.decorator';
import {WebSocketControllerFactory} from './websocket-controller-factory';

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
    server: http.Server,
  ) {
    super();
    this.io = new Server(server, {
      cors: {
        origin: '*'
      }
    });
    this.setupRoutes();
    server.on("close", () => {
      this.stop()
        .then(() => this.log("Closed Socket Server"))
        .catch((e) => this.log(e))
    })
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
      const reqCtx = new Context(this.ctx);

      // Bind websocket
      reqCtx.bind('ws.socket').to(socket);
      // this.ctx.bind('ws.socket').to(socket);

      // Instantiate the controller instance
      await new WebSocketControllerFactory(reqCtx, controllerClass).create(
        socket,
      );
    });
    nsp.use((socket, next) => {
      this.log(
        'Middleware for namespace %s - socket: %s',
        socket.nsp.name,
        socket.id,
      );
      next();
    });
    return nsp;
  }

  /**
   * Setup routes
   */
  private setupRoutes() {
    this.use((socket, next) => {
      this.log('Global middleware - socket:', socket.id);
      next();
    });

    // Add a ws route to WarEntityPreviewController
    this.route(WarEntityPreviewController, /^\/WarEntityPreview/)

    // Add a ws route to ImportTableController
    this.route(ImportTableController, /^\/ImportTable/)

    // Add a ws route to SystemStatusController
    this.route(SysStatusController, /^\/SysStatus/)

    // Add a ws route to FieldChangeController
    this.route(FieldChangeController, /^\/FieldChange/)

  }

  /**
   * Stop the websocket server
   */
  private async stop() {
    const close = new Promise<void>((resolve, reject) => {
      this.io.close(() => {
        resolve();
      });
    });
    await close;
  }

  private log(msg: string, ...params: string[]) {
    if (process.env.NO_LOGS === 'true') return;
    console.log(msg, ...params)
  }
}
