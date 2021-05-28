import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConfigService } from './config.service';
@Injectable()
export class FieldChangeSocket extends Socket {
  static NAMESPACE = 'FieldChange'
  constructor(
    c: ConfigService,
    // @Optional() @Inject(SOCKETS_CONFIG) config?: SocketsConfig,
  ) {

    super({ url: c.config.baseUrl + '/' + FieldChangeSocket.NAMESPACE });

  }
}
