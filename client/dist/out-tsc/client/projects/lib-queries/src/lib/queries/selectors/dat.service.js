import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { DatActions, datDefinitions, datRoot } from '@kleiolab/lib-redux';
import { latestVersion } from '@kleiolab/lib-utils';
import { map } from 'rxjs/operators';
class Selector {
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    selector(indexKey) {
        const all$ = this.ngRedux.select([datRoot, this.model, indexKey]);
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        const key = (x) => this.ngRedux.select([datRoot, this.model, indexKey, x]);
        // .pipe(
        //   distinctUntilChanged<M>(equals)
        // )
        return { all$, key };
    }
}
class DatDigitalSelections extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity__entity_version$ = this.selector('by_pk_entity__entity_version');
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_pk_text$ = this.selector('by_pk_text');
    }
    latestVersion(pkDigital) {
        return this.by_pk_entity$.key(pkDigital).pipe(map(versions => latestVersion(versions)));
    }
}
class DatNamespaceSelections extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_project$ = this.selector('by_fk_project');
    }
}
class DatChunkSelections extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_text$ = this.selector('by_fk_text');
    }
}
class DatClassColumnMappingSelections extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_column$ = this.selector('by_fk_column');
    }
}
class DatColumnSelections extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_digital$ = this.selector('by_fk_digital');
    }
}
class DatTextPropertySelections extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
        this.by_fk_entity__fk_system_type$ = this.selector('by_fk_entity__fk_system_type');
    }
}
let DatSelector = class DatSelector extends DatActions {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.digital$ = new DatDigitalSelections(this.ngRedux, datDefinitions, 'digital');
        this.namespace$ = new DatNamespaceSelections(this.ngRedux, datDefinitions, 'namespace');
        this.chunk$ = new DatChunkSelections(this.ngRedux, datDefinitions, 'chunk');
        this.column$ = new DatColumnSelections(this.ngRedux, datDefinitions, 'column');
        this.class_column_mapping$ = new DatClassColumnMappingSelections(this.ngRedux, datDefinitions, 'class_column_mapping');
        this.text_property$ = new DatTextPropertySelections(this.ngRedux, datDefinitions, 'text_property');
    }
};
DatSelector = tslib_1.__decorate([
    Injectable()
], DatSelector);
export { DatSelector };
//# sourceMappingURL=dat.service.js.map