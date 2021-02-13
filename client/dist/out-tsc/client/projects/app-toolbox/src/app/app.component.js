import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
let AppComponent = class AppComponent {
    constructor(status) {
        this.status = status;
        this.warehouseInitializing = false;
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
        this.status.on('warehouseInitializing', (message) => {
            this.warehouseInitializing = message;
        });
    }
};
AppComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-root',
        templateUrl: './app.component.html',
        styleUrls: ['./app.component.scss']
    })
], AppComponent);
export { AppComponent };
//# sourceMappingURL=app.component.js.map