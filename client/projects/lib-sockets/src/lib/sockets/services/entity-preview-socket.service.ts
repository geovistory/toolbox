import { Injectable } from '@angular/core';
import { WarActions } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Socket } from 'ngx-socket-io';
import { ConfigService } from './config.service';
@Injectable()
export class EntityPreviewSocket extends Socket {

  constructor(
    warActions: WarActions,
    c: ConfigService,
    // @Optional() @Inject(SOCKETS_CONFIG) config?: SocketsConfig,
  ) {

    super({ url: c.config.baseUrl + '/WarEntityPreview', options: c.config.options });

    // dispatch a method to put the EntityPreview to the store
    this.fromEvent<WarEntityPreview>('entityPreview').subscribe(data => {
      warActions.entity_preview.loadSucceeded([data], '');
    });

  }
}
