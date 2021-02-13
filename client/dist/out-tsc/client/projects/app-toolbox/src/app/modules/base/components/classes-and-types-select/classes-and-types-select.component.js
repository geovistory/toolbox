import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let ClassesAndTypesSelectComponent = class ClassesAndTypesSelectComponent {
    constructor(i) {
        this.i = i;
        this.destroy$ = new Subject();
        this.select = new EventEmitter();
        this.treeControl = new FlatTreeControl(node => node.level, node => node.expandable);
        this.treeFlattener = new MatTreeFlattener((node, level) => {
            return {
                expandable: !!node.children && node.children.length > 0,
                label: node.label,
                data: node.data,
                level: level,
            };
        }, node => node.level, node => node.expandable, node => node.children);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
        this.hasChild = (_, node) => node.expandable;
    }
    // private _transformer =
    ngOnInit() {
        if (!this.enabledIn)
            throw new Error('You must provide enabledIn input');
        this.data$ = this.i.pipeClassesAndTypes(this.enabledIn);
        this.data$.pipe(takeUntil(this.destroy$)).subscribe(d => {
            this.dataSource.data = d;
            // this.treeControl.expandAll()
        });
    }
    onSelect(n) {
        this.select.emit(n.data);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], ClassesAndTypesSelectComponent.prototype, "enabledIn", void 0);
tslib_1.__decorate([
    Output()
], ClassesAndTypesSelectComponent.prototype, "select", void 0);
ClassesAndTypesSelectComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-classes-and-types-select',
        templateUrl: './classes-and-types-select.component.html',
        styleUrls: ['./classes-and-types-select.component.scss']
    })
], ClassesAndTypesSelectComponent);
export { ClassesAndTypesSelectComponent };
//# sourceMappingURL=classes-and-types-select.component.js.map