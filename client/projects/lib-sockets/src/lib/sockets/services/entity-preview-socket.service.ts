import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ConfigService } from './config.service';
@Injectable()
export class EntityPreviewSocket extends Socket {

  constructor(
    c: ConfigService,
  ) {

    super({
      url: c.createNamespaceUrl('WarEntityPreview'),
      options: {
        ...c.config.options,
        path: c.path
      }
    });

  }
}
