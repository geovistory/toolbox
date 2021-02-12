import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketIoModule } from 'ngx-socket-io';
import { EntityPreviewSocket, ImportTableSocket, SysStatusSocket } from './services';
import { SocketsConfig } from './models/SocketsConfig';

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
export class SocketsModule {

  static forRoot(config: SocketsConfig): ModuleWithProviders<SocketsModule> {
    return {
      ngModule: SocketsModule,
      providers: [
        { provide: SocketsConfig, useValue: config },
        EntityPreviewSocket,
        ImportTableSocket,
        SysStatusSocket
      ],
    }
  }
  constructor(@Optional() @SkipSelf() parentModule?: SocketsModule) {
    if (parentModule) {
      throw new Error(
        'GreetingModule is already loaded. Import it in the AppModule only');
    }
  }

}
