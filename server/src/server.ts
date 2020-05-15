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

import {ApplicationConfig} from '@loopback/core';
import express from 'express';
import * as http from 'http';
import pEvent from 'p-event';
import {GeovistoryApplication} from './application';

const loopback = require('loopback');
const compression = require('compression');
const cors = require('cors');
const helmet = require('helmet');

export class ExpressServer {
  private app: express.Application;
  public readonly lbApp: GeovistoryApplication;
  private server?: http.Server;

  get url(): string | undefined {
    return this.lbApp.restServer.url
  }

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    this.lbApp = new GeovistoryApplication(options);

    // Middleware migrated from LoopBack 3
    this.app.use(loopback.favicon());
    this.app.use(compression());
    this.app.use(cors());
    this.app.use(helmet());

    // Mount the LB4 REST API
    this.app.use('/api', this.lbApp.requestHandler);

    // // Custom Express routes
    // this.app.get('/ping', function (_req: Request, res: Response) {
    //   res.send('pong');
    // });

    // Serve static files in the public folder
    // this.app.use(express.static('/', path.join(__dirname, '../../client/dist')));
  }

  public async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    await this.lbApp.start();
    const port = this.lbApp.restServer.config.port || 3000;
    const host = this.lbApp.restServer.config.host ?? '127.0.0.1';
    this.server = this.app.listen(port, host);

    await pEvent(this.server, 'listening');
  }

  public async stop() {
    if (!this.server) return;
    await this.lbApp.stop();
    this.server.close();
    await pEvent(this.server, 'close');
    this.server = undefined;
  }
}
