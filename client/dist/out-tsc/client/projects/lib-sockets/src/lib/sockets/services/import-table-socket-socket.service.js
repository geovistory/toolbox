import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
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
//# sourceMappingURL=import-table-socket-socket.service.js.map