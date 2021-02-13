import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SchemaActionsFactory } from '../redux-store/schema-actions-factory';
import { warRoot } from './war.config';
let WarActions = class WarActions {
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.entity_preview = new SchemaActionsFactory(this.ngRedux).createCrudActions(warRoot, 'entity_preview');
    }
};
WarActions = tslib_1.__decorate([
    Injectable()
], WarActions);
export { WarActions };
//# sourceMappingURL=war.actions.js.map