import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketsConfig } from './models/SocketsConfig';
import { EntityPreviewSocket } from './services/entity-preview-socket.service';
import { FieldChangeSocket } from './services/field-change-socket.service';
import { ImportTableSocket } from './services/import-table-socket-socket.service';
import { SysStatusSocket } from './services/sys-status-socket.service';

@NgModule({
  declarations: [
    // components
  ],
  imports: [
    SocketIoModule,
    // ...
  ],
  providers: [EntityPreviewSocket, ImportTableSocket, SysStatusSocket, FieldChangeSocket],
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
        SysStatusSocket,
        FieldChangeSocket
      ],
    }
  }
  constructor(@Optional() @SkipSelf() parentModule?: SocketsModule) {
    if (parentModule) {
      throw new Error(
        'SocketsModule is already loaded. Import it in the AppModule only');
    }
  }

}
