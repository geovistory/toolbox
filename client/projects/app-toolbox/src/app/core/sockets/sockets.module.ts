import { Injectable, NgModule } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { WarActions } from '../war/war.actions';
import { WarEntityPreview } from '../sdk-lb4/model/warEntityPreview';

@Injectable()
export class EntityPreviewSocket extends Socket {
  constructor(warActions: WarActions) {
    super({ url: environment.baseUrl + '/WarEntityPreview' });

    // dispatch a method to put the EntityPreview to the store
    this.fromEvent<WarEntityPreview>('entityPreview').subscribe(data => {
      warActions.entity_preview.loadSucceeded([data], '')
    })

  }
}

@Injectable()
export class ImportTableSocket extends Socket {
  connected = false;

  constructor() {
    super({ url: environment.baseUrl + '/ImportTable' });
    this.connected = true;
  }

  cleanConnect() {
    if (!this.connected) this.connect();
  }

  cleanDisconnect() {
    this.disconnect();
    this.connected = false;
  }

}


@Injectable()
export class SysStatusSocket extends Socket {
  constructor() {
    super({ url: environment.baseUrl + '/SysStatus' });
  }
}


@NgModule({
  declarations: [
    // components
  ],
  imports: [
    SocketIoModule,
    // ...
  ],
  providers: [EntityPreviewSocket, ImportTableSocket, SysStatusSocket],
  bootstrap: [/** AppComponent **/]
})
export class SocketsModule { }
