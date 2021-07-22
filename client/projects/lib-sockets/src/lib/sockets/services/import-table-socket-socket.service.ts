import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConfigService } from './config.service';
@Injectable()
export class ImportTableSocket extends Socket {
  connected = false;

  constructor(
    c: ConfigService,
    // @Optional() @Inject(SOCKETS_CONFIG) config?: SocketsConfig,
  ) {

    super({
      url: c.createNamespaceUrl('ImportTable'),
      options: { path: c.path }
    });

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
