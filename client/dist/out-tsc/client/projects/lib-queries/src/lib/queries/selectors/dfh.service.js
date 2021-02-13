import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { DfhActions } from '@kleiolab/lib-redux';
import { dfhDefinitions, dfhRoot } from '@kleiolab/lib-redux';
class Selector {
    constructor(ngRedux, configs, model, shouldPause$) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.shouldPause$ = shouldPause$;
        this.slice$ = this.ngRedux.select([dfhRoot, this.model]);
    }
    selector(indexKey) {
        const allNoPause$ = this.ngRedux.select([dfhRoot, this.model, indexKey]);
        const all$ = this.shouldPause$.pipe(switchMap(shouldPause => shouldPause ?
            empty() :
            allNoPause$));
        const keyNoPause = (x) => this.ngRedux.select([dfhRoot, this.model, indexKey, x]);
        const key = (x) => this.shouldPause$.pipe(switchMap(shouldPause => shouldPause ?
            empty() :
            this.ngRedux.select([dfhRoot, this.model, indexKey, x])));
        return { all$, key, noPause: { all$: allNoPause$, key: keyNoPause } };
    }
}
// Profile Selectors
class DfhProfileSelections extends Selector {
    constructor() {
        super(...arguments);
        this.by_pk_profile$ = this.selector('by_pk_profile');
    }
}
// Class Selectors
class DfhClassSelections extends Selector {
    constructor() {
        super(...arguments);
        this.by_pk_class$ = this.selector('by_pk_class');
        this.by_basic_type$ = this.selector('by_basic_type');
    }
}
// Property Selectors
class DfhPropertySelections extends Selector {
    constructor() {
        super(...arguments);
        this.pk_property__has_domain__has_range$ = this.selector('pk_property__has_domain__has_range');
        this.by_pk_property$ = this.selector('by_pk_property');
        this.by_has_domain__pk_property$ = this.selector('by_has_domain__pk_property');
        this.by_has_range__pk_property$ = this.selector('by_has_range__pk_property');
        this.by_has_domain$ = this.selector('by_has_domain');
        this.by_has_range$ = this.selector('by_has_range');
        this.by_is_has_type_subproperty$ = this.selector('by_is_has_type_subproperty');
    }
}
// Label Selectors
class DfhLabelSelections extends Selector {
    constructor() {
        super(...arguments);
        this.by_fks$ = this.selector('by_fks');
        this.by_fk_class__type$ = this.selector('by_fk_class__type');
        this.by_fk_property__type$ = this.selector('by_fk_property__type');
        this.by_fk_profile__type$ = this.selector('by_fk_profile__type');
    }
}
let DfhSelector = class DfhSelector extends DfhActions {
    constructor(ngRedux, pause) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.pause = pause;
        this.profile$ = new DfhProfileSelections(this.ngRedux, dfhDefinitions, 'profile', this.pause.shouldPause$);
        this.class$ = new DfhClassSelections(this.ngRedux, dfhDefinitions, 'klass', this.pause.shouldPause$);
        this.property$ = new DfhPropertySelections(this.ngRedux, dfhDefinitions, 'property', this.pause.shouldPause$);
        this.label$ = new DfhLabelSelections(this.ngRedux, dfhDefinitions, 'label', this.pause.shouldPause$);
    }
};
DfhSelector = tslib_1.__decorate([
    Injectable()
], DfhSelector);
export { DfhSelector };
//# sourceMappingURL=dfh.service.js.map