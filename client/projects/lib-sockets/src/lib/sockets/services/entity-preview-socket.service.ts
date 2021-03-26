import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";
import { SocketsConfig } from "../models/SocketsConfig";
import { WarActions } from '@kleiolab/lib-redux';
@Injectable()
export class EntityPreviewSocket extends Socket {

  constructor(
    warActions: WarActions,
    @Optional() config?: SocketsConfig
  ) {

    super({ url: config.baseUrl + '/WarEntityPreview' });

    // dispatch a method to put the EntityPreview to the store
    this.fromEvent<WarEntityPreview>('entityPreview').subscribe(data => {
      warActions.entity_preview.loadSucceeded([data], '');
    });

  }
}
