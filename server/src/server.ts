/**
 * This file is generated according to the tutorial for mounting Lb3 in Lb4
 * https://github.com/strongloop/loopback-next/tree/master/examples/lb3-application#tutorial
 *
 * It creates a base Express app for mounting the LB4 app as described in
 * "Creating an Express Application with LoopBack REST API" guide:
 * https://loopback.io/doc/en/lb4/express-with-lb4-rest-tutorial.html
 *
 * In short, the ExpressServer
 * - addsmounts the middleware migrated from Lb3
 * - mounts the Lb4 App
 */

import {ApplicationConfig, Context} from '@loopback/core';
import {once} from 'events';
import express from 'express';
import * as http from 'http';
import {AddressInfo} from 'net';
import {GeovistoryApplication} from './application';
import {WebSocketServer} from './components/websocket.server';
import {WarEntityPreviewController} from './controllers';



const loopback = require('loopback');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

export class GeovistoryServer extends Context {
  private app: express.Application;
  public readonly lbApp: GeovistoryApplication;
  private server?: http.Server;

  // web sockets
  // private wsServerOptions: HttpOptions | HttpsOptions
  // private io: Server;
  // httpServer: HttpServer;
  readonly wsServer: WebSocketServer;

  public url: String;

  constructor(private options: ApplicationConfig = {}) {
    super();

    this.app = express();
    this.lbApp = new GeovistoryApplication(options);

    // Middleware migrated from LoopBack 3
    this.app.use(loopback.favicon());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());

    // Mount the LB4 REST API
    this.app.use('/', this.lbApp.requestHandler);

    // Create ws server
    this.wsServer = new WebSocketServer();
    this.bind('servers.websocket.server1').to(this.wsServer);
    this.wsServer.use((socket, next) => {
      this.log('Global middleware - socket:', socket.id);
      next();
    });

    // Add a ws route to WarEntityPreviewController
    const ns = this.wsServer.route(WarEntityPreviewController, /^\/WarEntityPreview/);
    ns.use((socket, next) => {
      this.log(
        'Middleware for namespace %s - socket: %s',
        socket.nsp.name,
        socket.id,
      );
      next();
    });

  }

  public async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    // Rest server
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host ?? '127.0.0.1';
    this.server = this.app.listen(port, host);
    await once(this.server, 'listening');
    const add = <AddressInfo>this.server.address();
    this.url = `http://${add.address}:${add.port}`;
    // Websocket server
    await this.wsServer.start(this.server);

  }

  public async stop() {

    // Rest server
    if (this.server) {

      await this.lbApp.stop();
      this.server.close();
      await once(this.server, 'close');
      this.server = undefined;
    }

    // Websocket server
    await this.wsServer.stop();

  }


  private log(msg: string, ...params: string[]) {
    if (process.env.NO_LOGS === 'true') return;
    console.log(msg, ...params)
  }


}