import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { of } from 'rxjs';
import { first } from 'rxjs/operators';
import { TableFormService } from '../../table/table-form/table-form.service';
let MapAndTimeContFormArrayComponent = class MapAndTimeContFormArrayComponent {
    constructor(t) {
        this.t = t;
    }
    ngOnInit() {
        console.log(this.formArrayFactory.children);
    }
    addQueryDefinition(child) {
        const selectedClasses$ = child.valueChanges$;
        selectedClasses$.pipe(first()).subscribe(selectedClasses => {
            const initVal = {
                data: selectedClasses,
                children: []
            };
            const conf = this.t.queryDefinitionConfig(this.t.rootClasses$, of(initVal), initVal);
            const [ctrlRoot, ...rest] = conf.config;
            this.formArrayFactory.appendMany(rest);
            child.config.disabled$.next(true);
        });
    }
    removeQueryDefinition(child) {
        this.formArrayFactory.removeLastChild();
        this.formArrayFactory.removeLastChild();
        child.config.disabled$.next(false);
    }
};
tslib_1.__decorate([
    Input()
], MapAndTimeContFormArrayComponent.prototype, "formArrayFactory", void 0);
MapAndTimeContFormArrayComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-map-and-time-cont-form-array',
        templateUrl: './map-and-time-cont-form-array.component.html',
        styleUrls: ['./map-and-time-cont-form-array.component.scss'],
        providers: [TableFormService]
    })
], MapAndTimeContFormArrayComponent);
export { MapAndTimeContFormArrayComponent };
//# sourceMappingURL=map-and-time-cont-form-array.component.js.map