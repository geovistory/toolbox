import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { warRoot } from '../reducer-configs/war.config';
import { SchemaActionsFactory } from '../_helpers/schema-actions-factory';
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