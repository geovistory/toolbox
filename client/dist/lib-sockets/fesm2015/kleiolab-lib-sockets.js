import { Injectable, Optional, NgModule, SkipSelf } from '@angular/core';
import { Socket, SocketIoModule } from 'ngx-socket-io';
import { WarActions } from '@kleiolab/lib-redux';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/models/SocketsConfig.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SocketsConfig {
    constructor() {
        this.baseUrl = '';
    }
}
if (false) {
    /** @type {?} */
    SocketsConfig.prototype.baseUrl;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/entity-preview-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class EntityPreviewSocket extends Socket {
    /**
     * @param {?} warActions
     * @param {?=} config
     */
    constructor(warActions, config) {
        super({ url: config.baseUrl + '/WarEntityPreview' });
        // dispatch a method to put the EntityPreview to the store
        this.fromEvent('entityPreview').subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            warActions.entity_preview.loadSucceeded([data], '');
        }));
    }
}
EntityPreviewSocket.decorators = [
    { type: Injectable }
];
/** @nocollapse */
EntityPreviewSocket.ctorParameters = () => [
    { type: WarActions },
    { type: SocketsConfig, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/import-table-socket-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ImportTableSocket extends Socket {
    /**
     * @param {?=} config
     */
    constructor(config) {
        super({ url: config.baseUrl + '/ImportTable' });
        this.connected = false;
        this.connected = true;
    }
    /**
     * @return {?}
     */
    cleanConnect() {
        if (!this.connected)
            this.connect();
    }
    /**
     * @return {?}
     */
    cleanDisconnect() {
        this.disconnect();
        this.connected = false;
    }
}
ImportTableSocket.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ImportTableSocket.ctorParameters = () => [
    { type: SocketsConfig, decorators: [{ type: Optional }] }
];
if (false) {
    /** @type {?} */
    ImportTableSocket.prototype.connected;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/sys-status-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SysStatusSocket extends Socket {
    /**
     * @param {?=} config
     */
    constructor(config) {
        super({ url: config.baseUrl + '/SysStatus' });
    }
}
SysStatusSocket.decorators = [
    { type: Injectable }
];
/** @nocollapse */
SysStatusSocket.ctorParameters = () => [
    { type: SocketsConfig, decorators: [{ type: Optional }] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/sockets.module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class SocketsModule {
    /**
     * @param {?=} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('SocketsModule is already loaded. Import it in the AppModule only');
        }
    }
    /**
     * @param {?} config
     * @return {?}
     */
    static forRoot(config) {
        return {
            ngModule: SocketsModule,
            providers: [
                { provide: SocketsConfig, useValue: config },
                EntityPreviewSocket,
                ImportTableSocket,
                SysStatusSocket
            ],
        };
    }
}
SocketsModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                // components
                ],
                imports: [
                    SocketIoModule,
                ],
                providers: [EntityPreviewSocket, ImportTableSocket, SysStatusSocket],
                bootstrap: [ /** AppComponent **/]
            },] }
];
/** @nocollapse */
SocketsModule.ctorParameters = () => [
    { type: SocketsModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: kleiolab-lib-sockets.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { EntityPreviewSocket, ImportTableSocket, SocketsConfig, SocketsModule, SysStatusSocket };
//# sourceMappingURL=kleiolab-lib-sockets.js.map
