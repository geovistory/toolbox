import { __extends } from 'tslib';
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { WarActions } from '@kleiolab/lib-redux';

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/models/SocketsConfig.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SocketsConfig = /** @class */ (function () {
    function SocketsConfig() {
        this.baseUrl = '';
    }
    return SocketsConfig;
}());
if (false) {
    /** @type {?} */
    SocketsConfig.prototype.baseUrl;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/models/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/entity-preview-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var EntityPreviewSocket = /** @class */ (function (_super) {
    __extends(EntityPreviewSocket, _super);
    function EntityPreviewSocket(warActions, config) {
        var _this = _super.call(this, { url: config.baseUrl + '/WarEntityPreview' }) || this;
        // dispatch a method to put the EntityPreview to the store
        _this.fromEvent('entityPreview').subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            warActions.entity_preview.loadSucceeded([data], '');
        }));
        return _this;
    }
    EntityPreviewSocket.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    EntityPreviewSocket.ctorParameters = function () { return [
        { type: WarActions },
        { type: SocketsConfig, decorators: [{ type: Optional }] }
    ]; };
    return EntityPreviewSocket;
}(Socket));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/import-table-socket-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var ImportTableSocket = /** @class */ (function (_super) {
    __extends(ImportTableSocket, _super);
    function ImportTableSocket(config) {
        var _this = _super.call(this, { url: config.baseUrl + '/ImportTable' }) || this;
        _this.connected = false;
        _this.connected = true;
        return _this;
    }
    /**
     * @return {?}
     */
    ImportTableSocket.prototype.cleanConnect = /**
     * @return {?}
     */
    function () {
        if (!this.connected)
            this.connect();
    };
    /**
     * @return {?}
     */
    ImportTableSocket.prototype.cleanDisconnect = /**
     * @return {?}
     */
    function () {
        this.disconnect();
        this.connected = false;
    };
    ImportTableSocket.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    ImportTableSocket.ctorParameters = function () { return [
        { type: SocketsConfig, decorators: [{ type: Optional }] }
    ]; };
    return ImportTableSocket;
}(Socket));
if (false) {
    /** @type {?} */
    ImportTableSocket.prototype.connected;
}

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/sys-status-socket.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SysStatusSocket = /** @class */ (function (_super) {
    __extends(SysStatusSocket, _super);
    function SysStatusSocket(config) {
        return _super.call(this, { url: config.baseUrl + '/SysStatus' }) || this;
    }
    SysStatusSocket.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    SysStatusSocket.ctorParameters = function () { return [
        { type: SocketsConfig, decorators: [{ type: Optional }] }
    ]; };
    return SysStatusSocket;
}(Socket));

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/services/index.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * Generated from: lib/sockets/index.ts
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

export { EntityPreviewSocket, ImportTableSocket, SocketsConfig, SysStatusSocket };
//# sourceMappingURL=kleiolab-lib-sockets.js.map
