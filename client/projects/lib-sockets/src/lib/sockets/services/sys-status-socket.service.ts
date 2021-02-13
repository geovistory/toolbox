import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { SocketsConfig } from '../models/SocketsConfig';
@Injectable()
export class SysStatusSocket extends Socket {

  constructor(
    @Optional() config?: SocketsConfig
  ) {

    super({ url: config.baseUrl + '/SysStatus' });

  }
}
