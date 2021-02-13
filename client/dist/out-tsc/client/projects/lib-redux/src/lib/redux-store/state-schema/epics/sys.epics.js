import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineEpics } from 'redux-observable-es6-compat';
import { map } from 'rxjs/operators';
import { sysRoot } from '../reducer-configs/sys.config';
import { SchemaEpicsFactory } from '../_helpers/schema-epics-factory';
let SysEpics = class SysEpics {
    constructor(actions, notification, sysRelevantClassApi, 
    // private sysAnalysisTypeApi: SysAnalysisTypeApi,
    sysConfigApi) {
        this.actions = actions;
        this.notification = notification;
        this.sysRelevantClassApi = sysRelevantClassApi;
        this.sysConfigApi = sysConfigApi;
    }
    createEpics() {
        const systemRelevantClassEpicsFactory = new SchemaEpicsFactory(sysRoot, 'system_relevant_class', this.actions.system_relevant_class, this.notification);
        // const analysisTypeEpicsFactory = new StandardEpicsFactory<SysRelevantClassSlice, SysAnalysisType>
        //   (sysRoot, 'analysis_type', this.actions.analysis_type, this.notification);
        const configEpicsFactory = new SchemaEpicsFactory(sysRoot, 'config', this.actions.config, this.notification);
        return combineEpics(
        // SystemRelevantClass Epics
        systemRelevantClassEpicsFactory.createLoadEpic((action) => this.sysRelevantClassApi.find(), ''), systemRelevantClassEpicsFactory.createUpsertEpic((meta) => this.sysRelevantClassApi.bulkReplaceOrCreate(meta.items)), 
        // analysisTypeEpicsFactory.createLoadEpic(() => this.sysAnalysisTypeApi.find(), ''),
        configEpicsFactory.createLoadEpic(() => this.sysConfigApi.sysConfigControllerGetSystemConfig().pipe(map(x => [x])), ''));
    }
};
SysEpics = tslib_1.__decorate([
    Injectable()
], SysEpics);
export { SysEpics };
//# sourceMappingURL=sys.epics.js.map