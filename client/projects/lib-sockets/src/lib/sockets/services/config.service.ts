import { Injectable } from '@angular/core';
import { SocketsConfig } from '../models/SocketsConfig';
@Injectable()
export class ConfigService {
  config: SocketsConfig = { baseUrl: '' }
  constructor() {
  }
}
