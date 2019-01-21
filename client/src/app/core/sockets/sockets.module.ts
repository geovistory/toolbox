import { Injectable, NgModule } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'environments/environment';

@Injectable()
export class EntityPreviewSocket extends Socket {

  constructor() {
    super({ url: environment.baseUrl + '/WarEntityPreview' });
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
  providers: [EntityPreviewSocket],
  bootstrap: [/** AppComponent **/]
})
export class SocketsModule { }
