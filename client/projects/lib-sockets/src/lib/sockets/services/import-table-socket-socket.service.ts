import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
@Injectable()
export class ImportTableSocket extends Socket {
  connected = false;

  constructor(
    @Optional() config?: SocketsConfig
  ) {

    super({ url: config.baseUrl + '/ImportTable' });

    this.connected = true;

  }

  cleanConnect() {
    if (!this.connected) this.connect();
  }

  cleanDisconnect() {
    this.disconnect();
    this.connected = false;
  }
}
