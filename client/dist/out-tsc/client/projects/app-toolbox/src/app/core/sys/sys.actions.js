import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { SchemaActionsFactory } from 'projects/app-toolbox/src/app/core/redux-store/schema-actions-factory';
import { sysRoot } from './sys.config';
;
let SysActions = class SysActions {
    constructor(ngRedux) {
        this.ngRedux = ngRedux;
        this.system_relevant_class = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'system_relevant_class');
        // analysis_type = new StandardActionsFactory<Payload, SysAnalysisType>
        //   (this.ngRedux).createCrudActions(sysRoot, 'analysis_type');
        this.config = new SchemaActionsFactory(this.ngRedux).createCrudActions(sysRoot, 'config');
    }
};
SysActions = tslib_1.__decorate([
    Injectable()
], SysActions);
export { SysActions };
//# sourceMappingURL=sys.actions.js.map