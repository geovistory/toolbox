import { SysActions } from './sys.actions';
import { sysDefinitions, sysRoot } from './sys.config';
class Selector {
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.slice$ = this.ngRedux.select([sysRoot, this.model]);
    }
    selector(indexKey) {
        const all$ = this.ngRedux.select([sysRoot, this.model, indexKey]);
        const key = (x) => this.ngRedux.select([sysRoot, this.model, indexKey, x]);
        return { all$, key };
    }
}
// SystemRelevantClass Selectors
class SysSystemRelevantClassSelections extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_class$ = this.selector('by_fk_class');
        this.by_required_by_sources$ = this.selector('by_required_by_sources');
        this.by_required$ = this.selector('by_required');
    }
}
// // AnalysisType Selectors
// class SysAnalysisTypeSelections extends Selector<SysAnalysisTypeSlice> {
//   public by_pk_entity$ = this.selector<SysAnalysisType>('by_pk_entity');
//   constructor(
//     public ngRedux: NgRedux<IAppState>,
//     public configs: ReducerConfigCollection,
//     public model: string
//   ) { super(ngRedux, configs, model) }
// }
// Config Selectors
class SysConfigSelections extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.main$ = this.ngRedux.select([sysRoot, this.model, 'by_main', 'main']);
    }
}
export class SysSelector extends SysActions {
    constructor() {
        super(...arguments);
        this.system_relevant_class$ = new SysSystemRelevantClassSelections(this.ngRedux, sysDefinitions, 'system_relevant_class');
        // analysis_type$ = new SysAnalysisTypeSelections(this.ngRedux, sysDefinitions, 'analysis_type')
        this.config$ = new SysConfigSelections(this.ngRedux, sysDefinitions, 'config');
    }
}
//# sourceMappingURL=sys.service.js.map