import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { TabActions } from './tab.actions';
import { tabDefinitions, tabRoot } from './tab.config';
class Selector {
    constructor(ngRedux, configs, model) {
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
    }
    selector(indexKey) {
        const all$ = this.ngRedux.select([tabRoot, this.model, indexKey]);
        const key = (x) => this.ngRedux.select([tabRoot, this.model, indexKey, x]);
        return { all$, key };
    }
}
class TabCellSelections extends Selector {
    constructor(ngRedux, configs, model) {
        super(ngRedux, configs, model);
        this.ngRedux = ngRedux;
        this.configs = configs;
        this.model = model;
        this.by_pk_cell$ = this.selector('by_pk_cell');
        this.by_fk_column_fk_row$ = this.selector('by_fk_column_fk_row');
    }
}
let TabSelector = class TabSelector extends TabActions {
    constructor(ngRedux) {
        super(ngRedux);
        this.ngRedux = ngRedux;
        this.cell$ = new TabCellSelections(this.ngRedux, tabDefinitions, 'cell');
    }
};
TabSelector = tslib_1.__decorate([
    Injectable()
], TabSelector);
export { TabSelector };
//# sourceMappingURL=tab.service.js.map