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
  // get the path of the baseUrl (e.g: 'https://foo.org/abc' returns '/abc')
  get path(): string {
    const suffix = '/socket.io'
    try {
      return this.removeTrailingSlash(new URL(this.config.baseUrl).pathname) + suffix
    } catch {
      return suffix
    }
  }

  get url(): string {
    try {
      return this.removeTrailingSlash(new URL(this.config.baseUrl).origin)
    } catch {
      return ''
    }
  }

  public createNamespaceUrl(namespace: string) {
    return this.removeTrailingSlash(this.url) + '/' + namespace;
  }
  private removeTrailingSlash(x: string) {
    return x.replace(/\/$/, '');
  }
}
