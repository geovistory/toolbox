import * as tslib_1 from "tslib";
import { Injectable, Optional } from '@angular/core';
import { Socket } from 'ngx-socket-io';
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
//# sourceMappingURL=sys-status-socket.service.js.map