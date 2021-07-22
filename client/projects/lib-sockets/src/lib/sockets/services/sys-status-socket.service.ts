import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConfigService } from './config.service';
@Injectable()
export class SysStatusSocket extends Socket {

  constructor(
    c: ConfigService,
    // @Optional() @Inject(SOCKETS_CONFIG) config?: SocketsConfig,
  ) {

    super({
      url: c.createNamespaceUrl('SysStatus'),
      options: { path: c.path }
    });

  }
}
