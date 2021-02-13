import * as tslib_1 from "tslib";
import { Component, Input, Pipe } from '@angular/core';
import { of } from 'rxjs';
import { map, first } from 'rxjs/operators';
/*
 * Returns a column type label for a ColDef
 * Takes a ColDef.
 * Usage:
 *   coldef | coltype
 * Example:
 *   {{ {defaultType: 'entity_preview'} | coltype }}
 *   formats to: Entity Preview
*/
let ColtypePipe = class ColtypePipe {
    transform(value) {
        return getLabelForDefaulType(value.defaultType);
    }
};
ColtypePipe = tslib_1.__decorate([
    Pipe({ name: 'coltype' })
], ColtypePipe);
export { ColtypePipe };
let TableFormArrayComponent = class TableFormArrayComponent {
    constructor(t) {
        this.t = t;
        this.getLabelForDefaulType = (d) => getLabelForDefaulType(d);
    }
    ngOnInit() {
        // console.log(this.formArrayFactory.children)
    }
    /**
     * adds a new columnConfig
     */
    addPathColumn() {
        const colDef = { label: 'New Column' };
        const conf = this.t.columnConfig(colDef);
        this.formArrayFactory.append(conf);
    }
    /**
     * removes lineConfig with given index
     */
    removeColumn(index) {
        this.formArrayFactory.remove(index);
    }
    addDefaultColumn(defaultType) {
        const colDef = {
            defaultType,
            label: getLabelForDefaulType(defaultType),
            ofRootTable: true
        };
        const conf = this.t.columnConfig(colDef);
        this.formArrayFactory.append(conf);
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
    columnDropped(event) {
        this.formArrayFactory.moveItemInArray(event.previousIndex, event.currentIndex);
    }
    getLabelForDefaulType$(d$) { d$.pipe(map(d => this.getLabelForDefaulType(d))); }
};
tslib_1.__decorate([
    Input()
], TableFormArrayComponent.prototype, "formArrayFactory", void 0);
TableFormArrayComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-table-form-array',
        templateUrl: './table-form-array.component.html',
        styleUrls: ['./table-form-array.component.scss'],
        providers: [ColtypePipe]
    })
], TableFormArrayComponent);
export { TableFormArrayComponent };
export function getLabelForDefaulType(defaultType) {
    if (defaultType === 'entity_preview') {
        return 'Entity Preview';
    }
    else if (defaultType === 'class_label') {
        return 'Class Label';
    }
    else if (defaultType === 'type_label') {
        return 'Type Label';
    }
    else if (defaultType === 'entity_label') {
        return 'Entity Label';
    }
    else {
        return 'Path to related Entities';
    }
}
//# sourceMappingURL=table-form-array.component.js.map