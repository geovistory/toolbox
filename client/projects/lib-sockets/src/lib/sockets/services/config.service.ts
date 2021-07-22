import { Injectable } from '@angular/core';
import { SocketsConfig } from '../models/SocketsConfig';
@Injectable()
export class ConfigService {
  config: SocketsConfig = { baseUrl: '' }
  // get the path of the baseUrl (e.g: 'https://foo.org/abc' returns '/abc')
  get path(): string {
    const suffix = '/socket.io'
    try {
      return this.removeTrailingSlash(new URL(this.config.baseUrl).pathname) + suffix
    } catch {
      return suffix
    }
  }
  constructor() {
  }

  public createNamespaceUrl(namespace: string) {
    return this.removeTrailingSlash(this.config.baseUrl) + '/' + namespace;
  }
  private removeTrailingSlash(x: string) {
    return x.replace(/\/$/, '');
  }
}
