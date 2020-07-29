import { Injectable, NgModule } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'environments/environment';

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

@NgModule({
  declarations: [
    // components
  ],
  imports: [
    SocketIoModule,
    // ...
  ],
  providers: [EntityPreviewSocket, ImportTableSocket],
  bootstrap: [/** AppComponent **/]
})
export class SocketsModule { }
