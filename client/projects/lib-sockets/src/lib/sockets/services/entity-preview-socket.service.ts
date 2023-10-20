import { Injectable } from '@angular/core';
import { StateFacade } from '@kleiolab/lib-redux';
import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { Socket } from 'ngx-socket-io';
import { ConfigService } from './config.service';
@Injectable()
export class EntityPreviewSocket extends Socket {

  constructor(
    state: StateFacade,
    c: ConfigService,
    // @Optional() @Inject(SOCKETS_CONFIG) config?: SocketsConfig,
  ) {

    super({
      url: c.createNamespaceUrl('WarEntityPreview'),
      options: {
        ...c.config.options,
        path: c.path
      }
    });

    // dispatch a method to put the EntityPreview to the store
    this.fromEvent<WarEntityPreview>('entityPreview').subscribe(data => {
      state.data.war.entityPreview.loadSucceeded([data], '');
    });

  }
}
