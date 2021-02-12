import { Injectable, NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { WarActions } from '../war/war.actions';
import { WarEntityPreview } from "@kleiolab/lib-sdk-lb4";

@Injectable()
export class EntityPreviewSocket extends Socket {
  constructor(
    warActions: WarActions,
    @Optional() config?: SocketsConfig
  ) {
    super({ url: config.baseUrl + '/WarEntityPreview' });

    // dispatch a method to put the EntityPreview to the store
    this.fromEvent<WarEntityPreview>('entityPreview').subscribe(data => {
      warActions.entity_preview.loadSucceeded([data], '')
    })

  }
}

@Injectable()
export class ImportTableSocket extends Socket {
  connected = false;

  constructor(@Optional() config?: SocketsConfig) {
    super({ url: config.baseUrl + '/ImportTable' });
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
  constructor(@Optional() config?: SocketsConfig) {
    super({ url: config.baseUrl + '/SysStatus' });
  }
}

export class SocketsConfig {
  baseUrl = '';
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
