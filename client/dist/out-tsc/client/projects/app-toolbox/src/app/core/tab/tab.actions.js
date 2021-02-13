import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SchemaActionsFactory } from 'projects/app-toolbox/src/app/core/redux-store/schema-actions-factory';
import { tabRoot } from './tab.config';
let TabActions = class TabActions {
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.cell = new SchemaActionsFactory(this.ngRedux).createCrudActions(tabRoot, 'cell');
    }
};
TabActions = tslib_1.__decorate([
    Injectable()
], TabActions);
export { TabActions };
//# sourceMappingURL=tab.actions.js.map