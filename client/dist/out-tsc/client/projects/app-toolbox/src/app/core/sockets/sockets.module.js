var SocketsModule_1;
import * as tslib_1 from "tslib";
import { Injectable, NgModule, Optional, SkipSelf } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
let EntityPreviewSocket = class EntityPreviewSocket extends Socket {
    constructor(warActions, config) {
        super({ url: config.baseUrl + '/WarEntityPreview' });
        // dispatch a method to put the EntityPreview to the store
        this.fromEvent('entityPreview').subscribe(data => {
            warActions.entity_preview.loadSucceeded([data], '');
        });
    }
};
EntityPreviewSocket = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(1, Optional())
], EntityPreviewSocket);
export { EntityPreviewSocket };
let ImportTableSocket = class ImportTableSocket extends Socket {
    constructor(config) {
        super({ url: config.baseUrl + '/ImportTable' });
        this.connected = false;
        this.connected = true;
    }
    cleanConnect() {
        if (!this.connected)
            this.connect();
    }
    cleanDisconnect() {
        this.disconnect();
        this.connected = false;
    }
};
ImportTableSocket = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Optional())
], ImportTableSocket);
export { ImportTableSocket };
let SysStatusSocket = class SysStatusSocket extends Socket {
    constructor(config) {
        super({ url: config.baseUrl + '/SysStatus' });
    }
};
SysStatusSocket = tslib_1.__decorate([
    Injectable(),
    tslib_1.__param(0, Optional())
], SysStatusSocket);
export { SysStatusSocket };
export class SocketsConfig {
    constructor() {
        this.baseUrl = '';
    }
}
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