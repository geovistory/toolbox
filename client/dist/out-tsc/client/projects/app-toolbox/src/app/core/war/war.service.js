import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { WarActions } from './war.actions';
import { warDefinitions, warRoot } from './war.config';
import { toString } from 'ramda';
class Selector {
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    selector(indexKey) {
        const all$ = this.ngRedux.select([warRoot, this.model, indexKey]);
        const key = (x) => {
            const k = typeof x === 'string' ? x : x.map((part) => toString(part)).join('_');
            ;
            return this.ngRedux.select([warRoot, this.model, indexKey, k]);
        };
        return { all$, key };
    }
}
class WarEntityPreviewSelector extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_entity$ = this.selector('by_pk_entity');
    }
}
let WarSelector = class WarSelector extends WarActions {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.entity_preview$ = new WarEntityPreviewSelector(this.ngRedux, warDefinitions, 'entity_preview');
    }
};
WarSelector = tslib_1.__decorate([
    Injectable()
], WarSelector);
export { WarSelector };
//# sourceMappingURL=war.service.js.map