import { Inject, InjectionToken, NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketIoModule } from 'ngx-socket-io';
import { SocketsConfig } from './models/SocketsConfig';
import { ConfigService } from './services/config.service';
import { EntityPreviewSocket } from './services/entity-preview-socket.service';
import { FieldChangeSocket } from './services/field-change-socket.service';
import { ImportTableSocket } from './services/import-table-socket-socket.service';
import { SysStatusSocket } from './services/sys-status-socket.service';
export const SOCKETS_CONFIG = new InjectionToken<SocketsConfig>('socketsConfig');

@NgModule({
  declarations: [
    // components
  ],
  imports: [
    SocketIoModule,
    // ...
  ],
  providers: [EntityPreviewSocket, ImportTableSocket, SysStatusSocket, FieldChangeSocket, ConfigService],
  bootstrap: [/** AppComponent **/]
})
export class SocketsModule {

  // static forRoot(config: SocketsConfig): ModuleWithProviders<SocketsModule> {
  //   return {
  //     ngModule: SocketsModule,
  //     providers: [
  //       { provide: SocketsConfig, useValue: (config) },
  //       EntityPreviewSocket,
  //       ImportTableSocket,
  //       SysStatusSocket,
  //       FieldChangeSocket
  //     ],
  //   }
  // }
  constructor(
    private configservice: ConfigService,
    @Optional() @SkipSelf() parentModule?: SocketsModule,
    @Optional() @Inject(SOCKETS_CONFIG) config?: SocketsConfig,
  ) {
    if (parentModule) {
      throw new Error(
        'SocketsModule is already loaded. Import it in the AppModule only');
    }
    if (config) this.configservice.config = config;
  }

}
