import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
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
//# sourceMappingURL=entity-preview-socket.service.js.map