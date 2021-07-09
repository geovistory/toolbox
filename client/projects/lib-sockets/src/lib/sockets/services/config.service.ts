import { Injectable } from '@angular/core';
import { SocketsConfig } from '../models/SocketsConfig';
@Injectable()
export class ConfigService {
  config: SocketsConfig = {
    baseUrl: '',
    // see https://socket.io/docs/v3/client-api/index.html
    options: {
      autoConnect: false
    }
  }
  constructor() {
  }
}
