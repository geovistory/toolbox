/**
 * @fileoverview added by tsickle
 * Generated from: selectors/pro.service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgRedux } from '@angular-redux/store';
import { Injectable } from '@angular/core';
import { ProActions, proDefinitions, proRoot } from '@kleiolab/lib-redux';
import { toString } from 'ramda';
import * as i0 from "@angular/core";
import * as i1 from "@angular-redux/store";
class Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    /**
     * @template M
     * @param {?} indexKey
     * @return {?}
     */
    selector(indexKey) {
        /** @type {?} */
        const all$ = this.ngRedux.select([proRoot, this.model, indexKey]);
        /** @type {?} */
        const key = (/**
         * @param {?} x
         * @return {?}
         */
        (x) => {
            /** @type {?} */
            const k = typeof x === 'string' ? x : x.map((/**
             * @param {?} part
             * @return {?}
             */
            (part) => toString(part))).join('_');
            ;
            return this.ngRedux.select([proRoot, this.model, indexKey, k]);
        });
        return { all$, key };
    }
}
if (false) {
    /** @type {?} */
    Selector.prototype.ngRedux;
    /** @type {?} */
    Selector.prototype.configs;
    /** @type {?} */
    Selector.prototype.model;
}
class ProProjectSelector extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProProjectSelector.prototype.by_pk_entity$;
    /** @type {?} */
    ProProjectSelector.prototype.ngRedux;
    /** @type {?} */
    ProProjectSelector.prototype.configs;
    /** @type {?} */
    ProProjectSelector.prototype.model;
}
class ProInfoProjRelSelector extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__fk_entity$ = this.selector('by_fk_project__fk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProInfoProjRelSelector.prototype.by_fk_project__fk_entity$;
    /** @type {?} */
    ProInfoProjRelSelector.prototype.ngRedux;
    /** @type {?} */
    ProInfoProjRelSelector.prototype.configs;
    /** @type {?} */
    ProInfoProjRelSelector.prototype.model;
}
class ProDfhClassProjRelSelector extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
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
if (false) {
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.by_fk_project__enabled_in_entities$;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.by_fk_project__fk_class$;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.by_fk_project$;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.ngRedux;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.configs;
    /** @type {?} */
    ProDfhClassProjRelSelector.prototype.model;
}
class ProDfhProfileProjRelSelector extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
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
if (false) {
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.by_fk_project__enabled$;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.by_fk_project__fk_profile$;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.by_fk_project$;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.ngRedux;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.configs;
    /** @type {?} */
    ProDfhProfileProjRelSelector.prototype.model;
}
class ProClassFieldConfigSelector extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fk_project__fk_class$ = this.selector('by_fk_project__fk_class');
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.by_fk_project__fk_class$;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.by_pk_entity$;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.ngRedux;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.configs;
    /** @type {?} */
    ProClassFieldConfigSelector.prototype.model;
}
class ProTextPropertySelector extends Selector {
    // public fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_domain__fk_system_type__fk_language')
    // public fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language$ = this.selector<ByPk<ProTextProperty>>('fk_project__fk_dfh_property__fk_dfh_property_range__fk_system_type__fk_language')
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_fks$ = this.selector('by_fks');
        this.by_fks_without_lang$ = this.selector('by_fks_without_lang');
    }
}
if (false) {
    /** @type {?} */
    ProTextPropertySelector.prototype.by_fks$;
    /** @type {?} */
    ProTextPropertySelector.prototype.by_fks_without_lang$;
    /** @type {?} */
    ProTextPropertySelector.prototype.ngRedux;
    /** @type {?} */
    ProTextPropertySelector.prototype.configs;
    /** @type {?} */
    ProTextPropertySelector.prototype.model;
}
class ProAnalysisSelector extends Selector {
    /**
     * @param {?} ngRedux
     * @param {?} configs
     * @param {?} model
     */
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
if (false) {
    /** @type {?} */
    ProAnalysisSelector.prototype.by_pk_entity$;
    /** @type {?} */
    ProAnalysisSelector.prototype.ngRedux;
    /** @type {?} */
    ProAnalysisSelector.prototype.configs;
    /** @type {?} */
    ProAnalysisSelector.prototype.model;
}
export class ProSelector extends ProActions {
    /**
     * @param {?} ngRedux
     */
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
}
ProSelector.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
ProSelector.ctorParameters = () => [
    { type: NgRedux }
];
/** @nocollapse */ ProSelector.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function ProSelector_Factory() { return new ProSelector(i0.ɵɵinject(i1.NgRedux)); }, token: ProSelector, providedIn: "root" });
if (false) {
    /** @type {?} */
    ProSelector.prototype.project$;
    /** @type {?} */
    ProSelector.prototype.info_proj_rel$;
    /** @type {?} */
    ProSelector.prototype.dfh_class_proj_rel$;
    /** @type {?} */
    ProSelector.prototype.dfh_profile_proj_rel$;
    /** @type {?} */
    ProSelector.prototype.class_field_config$;
    /** @type {?} */
    ProSelector.prototype.text_property$;
    /** @type {?} */
    ProSelector.prototype.analysis$;
    /** @type {?} */
    ProSelector.prototype.ngRedux;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9Aa2xlaW9sYWIvbGliLXF1ZXJpZXMvc3JjL2xpYi9xdWVyaWVzLyIsInNvdXJjZXMiOlsic2VsZWN0b3JzL3Byby5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFtQixVQUFVLEVBQUUsY0FBYyxFQUFFLE9BQU8sRUFBMkIsTUFBTSxxQkFBcUIsQ0FBQztBQUdwSCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sT0FBTyxDQUFDOzs7QUFNakMsTUFBTSxRQUFROzs7Ozs7SUFDWixZQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFGYixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO0lBQ2xCLENBQUM7Ozs7OztJQUVMLFFBQVEsQ0FBSSxRQUFnQjs7Y0FFcEIsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFVLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7O2NBRXBFLEdBQUc7Ozs7UUFBRyxDQUFDLENBQStCLEVBQWlCLEVBQUU7O2tCQUN2RCxDQUFDLEdBQUcsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxJQUFxQixFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDO1lBQUMsQ0FBQztZQUVsRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDbkUsQ0FBQyxDQUFBO1FBRUQsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsQ0FBQTtJQUN0QixDQUFDO0NBQ0Y7OztJQWpCRywyQkFBa0M7O0lBQ2xDLDJCQUF1Qzs7SUFDdkMseUJBQW9COztBQWlCeEIsTUFBTSxrQkFBbUIsU0FBUSxRQUFROzs7Ozs7SUFHdkMsWUFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBSHpCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFMZixrQkFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQWEsY0FBYyxDQUFDLENBQUE7SUFNN0IsQ0FBQztDQUNyQzs7O0lBUEMsMkNBQWdFOztJQUc5RCxxQ0FBa0M7O0lBQ2xDLHFDQUF1Qzs7SUFDdkMsbUNBQW9COztBQUt4QixNQUFNLHNCQUF1QixTQUFRLFFBQVE7Ozs7OztJQUczQyxZQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFDbEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFIekIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUxmLDhCQUF5QixHQUFHLElBQUksQ0FBQyxRQUFRLENBQWlCLDBCQUEwQixDQUFDLENBQUE7SUFNekQsQ0FBQztDQUNyQzs7O0lBUEMsMkRBQTRGOztJQUcxRix5Q0FBa0M7O0lBQ2xDLHlDQUF1Qzs7SUFDdkMsdUNBQW9COztBQUt4QixNQUFNLDBCQUEyQixTQUFRLFFBQVE7Ozs7OztJQUsvQyxZQUNTLE9BQTJCLEVBQzNCLE9BQWdDLEVBQ2hDLEtBQWE7UUFDbEIsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFIekIsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFDM0IsWUFBTyxHQUFQLE9BQU8sQ0FBeUI7UUFDaEMsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQVBmLHdDQUFtQyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQTJCLG9DQUFvQyxDQUFDLENBQUE7UUFDbkgsNkJBQXdCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBcUIseUJBQXlCLENBQUMsQ0FBQTtRQUN2RixtQkFBYyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQXFCLGVBQWUsQ0FBQyxDQUFBO0lBTXZDLENBQUM7Q0FDckM7OztJQVRDLHlFQUEwSDs7SUFDMUgsOERBQThGOztJQUM5RixvREFBMEU7O0lBR3hFLDZDQUFrQzs7SUFDbEMsNkNBQXVDOztJQUN2QywyQ0FBb0I7O0FBSXhCLE1BQU0sNEJBQTZCLFNBQVEsUUFBUTs7Ozs7O0lBS2pELFlBQ1MsT0FBMkIsRUFDM0IsT0FBZ0MsRUFDaEMsS0FBYTtRQUNsQixLQUFLLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQTtRQUh6QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixZQUFPLEdBQVAsT0FBTyxDQUF5QjtRQUNoQyxVQUFLLEdBQUwsS0FBSyxDQUFRO1FBUGYsNEJBQXVCLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBNkIsd0JBQXdCLENBQUMsQ0FBQTtRQUM3RiwrQkFBMEIsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUF1QiwyQkFBMkIsQ0FBQyxDQUFBO1FBQzdGLG1CQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBdUIsZUFBZSxDQUFDLENBQUE7SUFNekMsQ0FBQztDQUNyQzs7O0lBVEMsK0RBQW9HOztJQUNwRyxrRUFBb0c7O0lBQ3BHLHNEQUE0RTs7SUFHMUUsK0NBQWtDOztJQUNsQywrQ0FBdUM7O0lBQ3ZDLDZDQUFvQjs7QUFJeEIsTUFBTSwyQkFBNEIsU0FBUSxRQUFROzs7Ozs7SUFJaEQsWUFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBSHpCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFOZiw2QkFBd0IsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUE0Qix5QkFBeUIsQ0FBQyxDQUFBO1FBQzlGLGtCQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBc0IsY0FBYyxDQUFDLENBQUE7SUFNdEMsQ0FBQztDQUNyQzs7O0lBUkMsK0RBQXFHOztJQUNyRyxvREFBeUU7O0lBR3ZFLDhDQUFrQzs7SUFDbEMsOENBQXVDOztJQUN2Qyw0Q0FBb0I7O0FBS3hCLE1BQU0sdUJBQXdCLFNBQVEsUUFBUTs7Ozs7Ozs7SUFNNUMsWUFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBSHpCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFSZixZQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBa0IsUUFBUSxDQUFDLENBQUE7UUFDbEQseUJBQW9CLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBd0IscUJBQXFCLENBQUMsQ0FBQTtJQVF0RCxDQUFDO0NBQ3JDOzs7SUFWQywwQ0FBeUQ7O0lBQ3pELHVEQUF5Rjs7SUFLdkYsMENBQWtDOztJQUNsQywwQ0FBdUM7O0lBQ3ZDLHdDQUFvQjs7QUFLeEIsTUFBTSxtQkFBb0IsU0FBUSxRQUFROzs7Ozs7SUFHeEMsWUFDUyxPQUEyQixFQUMzQixPQUFnQyxFQUNoQyxLQUFhO1FBQ2xCLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBSHpCLFlBQU8sR0FBUCxPQUFPLENBQW9CO1FBQzNCLFlBQU8sR0FBUCxPQUFPLENBQXlCO1FBQ2hDLFVBQUssR0FBTCxLQUFLLENBQVE7UUFKZixrQkFBYSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQWMsY0FBYyxDQUFDLENBQUE7SUFLOUIsQ0FBQztDQUNyQzs7O0lBTkMsNENBQWlFOztJQUUvRCxzQ0FBa0M7O0lBQ2xDLHNDQUF1Qzs7SUFDdkMsb0NBQW9COztBQU94QixNQUFNLE9BQU8sV0FBWSxTQUFRLFVBQVU7Ozs7SUFVekMsWUFBbUIsT0FBMkI7UUFDNUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBREcsWUFBTyxHQUFQLE9BQU8sQ0FBb0I7UUFSOUMsYUFBUSxHQUFHLElBQUksa0JBQWtCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0UsbUJBQWMsR0FBRyxJQUFJLHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQzNGLHdCQUFtQixHQUFHLElBQUksMEJBQTBCLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxjQUFjLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztRQUN6RywwQkFBcUIsR0FBRyxJQUFJLDRCQUE0QixDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLHNCQUFzQixDQUFDLENBQUM7UUFDL0csd0JBQW1CLEdBQUcsSUFBSSwyQkFBMkIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQzFHLG1CQUFjLEdBQUcsSUFBSSx1QkFBdUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxlQUFlLENBQUMsQ0FBQztRQUM1RixjQUFTLEdBQUcsSUFBSSxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUk5RSxDQUFDOzs7WUFmRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7WUFwSFEsT0FBTzs7Ozs7SUF1SGQsK0JBQTJFOztJQUMzRSxxQ0FBMkY7O0lBQzNGLDBDQUF5Rzs7SUFDekcsNENBQStHOztJQUMvRywwQ0FBMEc7O0lBQzFHLHFDQUE0Rjs7SUFDNUYsZ0NBQThFOztJQUVsRSw4QkFBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ1JlZHV4IH0gZnJvbSAnQGFuZ3VsYXItcmVkdXgvc3RvcmUnO1xuaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnlQaywgSUFwcFN0YXRlLCBQcm9BY3Rpb25zLCBwcm9EZWZpbml0aW9ucywgcHJvUm9vdCwgUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24gfSBmcm9tICdAa2xlaW9sYWIvbGliLXJlZHV4JztcbmltcG9ydCB7IFByb0RmaENsYXNzUHJvalJlbCwgUHJvRGZoUHJvZmlsZVByb2pSZWwsIFByb0luZm9Qcm9qUmVsLCBQcm9UZXh0UHJvcGVydHkgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjMnO1xuaW1wb3J0IHsgUHJvQW5hbHlzaXMsIFByb0NsYXNzRmllbGRDb25maWcsIFByb1Byb2plY3QgfSBmcm9tICdAa2xlaW9sYWIvbGliLXNkay1sYjQnO1xuaW1wb3J0IHsgdG9TdHJpbmcgfSBmcm9tICdyYW1kYSc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cblxuXG5cbmNsYXNzIFNlbGVjdG9yIHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IH1cblxuICBzZWxlY3RvcjxNPihpbmRleEtleTogc3RyaW5nKTogeyBhbGwkOiBPYnNlcnZhYmxlPEJ5UGs8TT4+LCBrZXk6ICh4OiBzdHJpbmcgfCAoc3RyaW5nIHwgbnVtYmVyKVtdKSA9PiBPYnNlcnZhYmxlPE0+IH0ge1xuXG4gICAgY29uc3QgYWxsJCA9IHRoaXMubmdSZWR1eC5zZWxlY3Q8QnlQazxNPj4oW3Byb1Jvb3QsIHRoaXMubW9kZWwsIGluZGV4S2V5XSlcblxuICAgIGNvbnN0IGtleSA9ICh4OiBzdHJpbmcgfCAoc3RyaW5nIHwgbnVtYmVyKVtdKTogT2JzZXJ2YWJsZTxNPiA9PiB7XG4gICAgICBjb25zdCBrID0gdHlwZW9mIHggPT09ICdzdHJpbmcnID8geCA6IHgubWFwKChwYXJ0OiBzdHJpbmcgfCBudW1iZXIpID0+IHRvU3RyaW5nKHBhcnQpKS5qb2luKCdfJyk7O1xuXG4gICAgICByZXR1cm4gdGhpcy5uZ1JlZHV4LnNlbGVjdDxNPihbcHJvUm9vdCwgdGhpcy5tb2RlbCwgaW5kZXhLZXksIGtdKVxuICAgIH1cblxuICAgIHJldHVybiB7IGFsbCQsIGtleSB9XG4gIH1cbn1cblxuY2xhc3MgUHJvUHJvamVjdFNlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfcGtfZW50aXR5JCA9IHRoaXMuc2VsZWN0b3I8UHJvUHJvamVjdD4oJ2J5X3BrX2VudGl0eScpXG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIG5nUmVkdXg6IE5nUmVkdXg8SUFwcFN0YXRlPixcbiAgICBwdWJsaWMgY29uZmlnczogUmVkdWNlckNvbmZpZ0NvbGxlY3Rpb24sXG4gICAgcHVibGljIG1vZGVsOiBzdHJpbmdcbiAgKSB7IHN1cGVyKG5nUmVkdXgsIGNvbmZpZ3MsIG1vZGVsKSB9XG59XG5cblxuY2xhc3MgUHJvSW5mb1Byb2pSZWxTZWxlY3RvciBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3RfX2ZrX2VudGl0eSQgPSB0aGlzLnNlbGVjdG9yPFByb0luZm9Qcm9qUmVsPignYnlfZmtfcHJvamVjdF9fZmtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuXG5jbGFzcyBQcm9EZmhDbGFzc1Byb2pSZWxTZWxlY3RvciBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3RfX2VuYWJsZWRfaW5fZW50aXRpZXMkID0gdGhpcy5zZWxlY3RvcjxCeVBrPFByb0RmaENsYXNzUHJvalJlbD4+KCdieV9ma19wcm9qZWN0X19lbmFibGVkX2luX2VudGl0aWVzJylcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3RfX2ZrX2NsYXNzJCA9IHRoaXMuc2VsZWN0b3I8UHJvRGZoQ2xhc3NQcm9qUmVsPignYnlfZmtfcHJvamVjdF9fZmtfY2xhc3MnKVxuICBwdWJsaWMgYnlfZmtfcHJvamVjdCQgPSB0aGlzLnNlbGVjdG9yPFByb0RmaENsYXNzUHJvalJlbD4oJ2J5X2ZrX3Byb2plY3QnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBQcm9EZmhQcm9maWxlUHJvalJlbFNlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuICBwdWJsaWMgYnlfZmtfcHJvamVjdF9fZW5hYmxlZCQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8UHJvRGZoUHJvZmlsZVByb2pSZWw+PignYnlfZmtfcHJvamVjdF9fZW5hYmxlZCcpXG4gIHB1YmxpYyBieV9ma19wcm9qZWN0X19ma19wcm9maWxlJCA9IHRoaXMuc2VsZWN0b3I8UHJvRGZoUHJvZmlsZVByb2pSZWw+KCdieV9ma19wcm9qZWN0X19ma19wcm9maWxlJylcbiAgcHVibGljIGJ5X2ZrX3Byb2plY3QkID0gdGhpcy5zZWxlY3RvcjxQcm9EZmhQcm9maWxlUHJvalJlbD4oJ2J5X2ZrX3Byb2plY3QnKVxuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5jbGFzcyBQcm9DbGFzc0ZpZWxkQ29uZmlnU2VsZWN0b3IgZXh0ZW5kcyBTZWxlY3RvciB7XG4gIHB1YmxpYyBieV9ma19wcm9qZWN0X19ma19jbGFzcyQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8UHJvQ2xhc3NGaWVsZENvbmZpZz4+KCdieV9ma19wcm9qZWN0X19ma19jbGFzcycpXG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxQcm9DbGFzc0ZpZWxkQ29uZmlnPignYnlfcGtfZW50aXR5JylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuXG5jbGFzcyBQcm9UZXh0UHJvcGVydHlTZWxlY3RvciBleHRlbmRzIFNlbGVjdG9yIHtcbiAgcHVibGljIGJ5X2ZrcyQgPSB0aGlzLnNlbGVjdG9yPFByb1RleHRQcm9wZXJ0eT4oJ2J5X2ZrcycpXG4gIHB1YmxpYyBieV9ma3Nfd2l0aG91dF9sYW5nJCA9IHRoaXMuc2VsZWN0b3I8QnlQazxQcm9UZXh0UHJvcGVydHk+PignYnlfZmtzX3dpdGhvdXRfbGFuZycpXG4gIC8vIHB1YmxpYyBma19wcm9qZWN0X19ma19kZmhfcHJvcGVydHlfX2ZrX2RmaF9wcm9wZXJ0eV9kb21haW5fX2ZrX3N5c3RlbV90eXBlX19ma19sYW5ndWFnZSQgPSB0aGlzLnNlbGVjdG9yPEJ5UGs8UHJvVGV4dFByb3BlcnR5Pj4oJ2ZrX3Byb2plY3RfX2ZrX2RmaF9wcm9wZXJ0eV9fZmtfZGZoX3Byb3BlcnR5X2RvbWFpbl9fZmtfc3lzdGVtX3R5cGVfX2ZrX2xhbmd1YWdlJylcbiAgLy8gcHVibGljIGZrX3Byb2plY3RfX2ZrX2RmaF9wcm9wZXJ0eV9fZmtfZGZoX3Byb3BlcnR5X3JhbmdlX19ma19zeXN0ZW1fdHlwZV9fZmtfbGFuZ3VhZ2UkID0gdGhpcy5zZWxlY3RvcjxCeVBrPFByb1RleHRQcm9wZXJ0eT4+KCdma19wcm9qZWN0X19ma19kZmhfcHJvcGVydHlfX2ZrX2RmaF9wcm9wZXJ0eV9yYW5nZV9fZmtfc3lzdGVtX3R5cGVfX2ZrX2xhbmd1YWdlJylcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+LFxuICAgIHB1YmxpYyBjb25maWdzOiBSZWR1Y2VyQ29uZmlnQ29sbGVjdGlvbixcbiAgICBwdWJsaWMgbW9kZWw6IHN0cmluZ1xuICApIHsgc3VwZXIobmdSZWR1eCwgY29uZmlncywgbW9kZWwpIH1cbn1cblxuXG5jbGFzcyBQcm9BbmFseXNpc1NlbGVjdG9yIGV4dGVuZHMgU2VsZWN0b3Ige1xuXG4gIHB1YmxpYyBieV9wa19lbnRpdHkkID0gdGhpcy5zZWxlY3RvcjxQcm9BbmFseXNpcz4oJ2J5X3BrX2VudGl0eScpXG4gIGNvbnN0cnVjdG9yKFxuICAgIHB1YmxpYyBuZ1JlZHV4OiBOZ1JlZHV4PElBcHBTdGF0ZT4sXG4gICAgcHVibGljIGNvbmZpZ3M6IFJlZHVjZXJDb25maWdDb2xsZWN0aW9uLFxuICAgIHB1YmxpYyBtb2RlbDogc3RyaW5nXG4gICkgeyBzdXBlcihuZ1JlZHV4LCBjb25maWdzLCBtb2RlbCkgfVxufVxuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBQcm9TZWxlY3RvciBleHRlbmRzIFByb0FjdGlvbnMge1xuXG4gIHByb2plY3QkID0gbmV3IFByb1Byb2plY3RTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHByb0RlZmluaXRpb25zLCAncHJvamVjdCcpO1xuICBpbmZvX3Byb2pfcmVsJCA9IG5ldyBQcm9JbmZvUHJvalJlbFNlbGVjdG9yKHRoaXMubmdSZWR1eCwgcHJvRGVmaW5pdGlvbnMsICdpbmZvX3Byb2pfcmVsJyk7XG4gIGRmaF9jbGFzc19wcm9qX3JlbCQgPSBuZXcgUHJvRGZoQ2xhc3NQcm9qUmVsU2VsZWN0b3IodGhpcy5uZ1JlZHV4LCBwcm9EZWZpbml0aW9ucywgJ2RmaF9jbGFzc19wcm9qX3JlbCcpO1xuICBkZmhfcHJvZmlsZV9wcm9qX3JlbCQgPSBuZXcgUHJvRGZoUHJvZmlsZVByb2pSZWxTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHByb0RlZmluaXRpb25zLCAnZGZoX3Byb2ZpbGVfcHJval9yZWwnKTtcbiAgY2xhc3NfZmllbGRfY29uZmlnJCA9IG5ldyBQcm9DbGFzc0ZpZWxkQ29uZmlnU2VsZWN0b3IodGhpcy5uZ1JlZHV4LCBwcm9EZWZpbml0aW9ucywgJ2NsYXNzX2ZpZWxkX2NvbmZpZycpO1xuICB0ZXh0X3Byb3BlcnR5JCA9IG5ldyBQcm9UZXh0UHJvcGVydHlTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHByb0RlZmluaXRpb25zLCAndGV4dF9wcm9wZXJ0eScpO1xuICBhbmFseXNpcyQgPSBuZXcgUHJvQW5hbHlzaXNTZWxlY3Rvcih0aGlzLm5nUmVkdXgsIHByb0RlZmluaXRpb25zLCAnYW5hbHlzaXMnKTtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgbmdSZWR1eDogTmdSZWR1eDxJQXBwU3RhdGU+KSB7XG4gICAgc3VwZXIobmdSZWR1eClcbiAgfVxufVxuIl19