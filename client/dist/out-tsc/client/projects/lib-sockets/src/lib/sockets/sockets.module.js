var SocketsModule_1;
import * as tslib_1 from "tslib";
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SocketIoModule } from 'ngx-socket-io';
import { EntityPreviewSocket, ImportTableSocket, SysStatusSocket } from './services';
import { SocketsConfig } from './models/SocketsConfig';
let SocketsModule = SocketsModule_1 = class SocketsModule {
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('GreetingModule is already loaded. Import it in the AppModule only');
        }
    }
    static forRoot(config) {
        return {
            ngModule: SocketsModule_1,
            providers: [
                { provide: SocketsConfig, useValue: config },
                EntityPreviewSocket,
                ImportTableSocket,
                SysStatusSocket
            ],
        };
    }
};
SocketsModule = SocketsModule_1 = tslib_1.__decorate([
    NgModule({
        declarations: [
        // components
        ],
        imports: [
            SocketIoModule,
        ],
        providers: [EntityPreviewSocket, ImportTableSocket, SysStatusSocket],
        bootstrap: [ /** AppComponent **/]
    }),
    tslib_1.__param(0, Optional()), tslib_1.__param(0, SkipSelf())
], SocketsModule);
export { SocketsModule };
//# sourceMappingURL=sockets.module.js.map