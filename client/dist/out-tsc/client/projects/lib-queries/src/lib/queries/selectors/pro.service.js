import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { ProActions, proDefinitions, proRoot } from '@kleiolab/lib-redux';
import { toString } from 'ramda';
class Selector {
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    selector(indexKey) {
        const all$ = this.ngRedux.select([proRoot, this.model, indexKey]);
        const key = (x) => {
            const k = typeof x === 'string' ? x : x.map((part) => toString(part)).join('_');
            ;
            return this.ngRedux.select([proRoot, this.model, indexKey, k]);
        };
        return { all$, key };
    }
}
class ProProjectSelector extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
class ProInfoProjRelSelector extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__fk_entity$ = this.selector('by_fk_project__fk_entity');
    }
}
class ProDfhClassProjRelSelector extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__enabled_in_entities$ = this.selector('by_fk_project__enabled_in_entities');
        this.by_fk_project__fk_class$ = this.selector('by_fk_project__fk_class');
        this.by_fk_project$ = this.selector('by_fk_project');
    }
}
class ProDfhProfileProjRelSelector extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__enabled$ = this.selector('by_fk_project__enabled');
        this.by_fk_project__fk_profile$ = this.selector('by_fk_project__fk_profile');
        this.by_fk_project$ = this.selector('by_fk_project');
    }
}
class ProClassFieldConfigSelector extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__fk_class$ = this.selector('by_fk_project__fk_class');
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
class ProTextPropertySelector extends Selector {
    // public fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language')
    // public fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language')
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fks$ = this.selector('by_fks');
        this.by_fks_without_lang$ = this.selector('by_fks_without_lang');
    }
}
class ProAnalysisSelector extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
let ProSelector = class ProSelector extends ProActions {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.project$ = new ProProjectSelector(this.ngRedux, proDefinitions, 'project');
        this.info_proj_rel$ = new ProInfoProjRelSelector(this.ngRedux, proDefinitions, 'info_proj_rel');
        this.dfh_class_proj_rel$ = new ProDfhClassProjRelSelector(this.ngRedux, proDefinitions, 'dfh_class_proj_rel');
        this.dfh_profile_proj_rel$ = new ProDfhProfileProjRelSelector(this.ngRedux, proDefinitions, 'dfh_profile_proj_rel');
        this.class_field_config$ = new ProClassFieldConfigSelector(this.ngRedux, proDefinitions, 'class_field_config');
        this.text_property$ = new ProTextPropertySelector(this.ngRedux, proDefinitions, 'text_property');
        this.analysis$ = new ProAnalysisSelector(this.ngRedux, proDefinitions, 'analysis');
    }
};
ProSelector = tslib_1.__decorate([
    Injectable()
], ProSelector);
export { ProSelector };
//# sourceMappingURL=pro.service.js.map