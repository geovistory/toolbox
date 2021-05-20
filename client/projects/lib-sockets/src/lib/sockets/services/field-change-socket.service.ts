import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
@Injectable()
export class FieldChangeSocket extends Socket {
  static NAMESPACE = 'FieldChange'
  constructor(
    @Optional() config?: SocketsConfig
  ) {

    super({ url: config.baseUrl + '/' + FieldChangeSocket.NAMESPACE });

  }
}
