import { Injectable, NgModule } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { environment } from 'environments/environment';

@Injectable()
export class DataUnitPreviewSocket extends Socket {

  constructor() {
    super({ url: environment.baseUrl + '/InfDataUnitPreview' });
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
  providers: [DataUnitPreviewSocket],
  bootstrap: [/** AppComponent **/]
})
export class SocketsModule { }
