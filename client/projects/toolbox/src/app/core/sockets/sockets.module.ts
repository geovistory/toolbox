import { Injectable, NgModule } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'projects/toolbox/src/environments/environment';

@Injectable()
export class EntityPreviewSocket extends Socket {
  constructor() {
    super({ url: environment.baseUrl + '/WarEntityPreview' });
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
