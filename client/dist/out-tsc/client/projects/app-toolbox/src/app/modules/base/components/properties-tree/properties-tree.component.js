import * as tslib_1 from "tslib";
import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, HostBinding } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { PropertiesTreeService } from './properties-tree.service';
let PropertiesTreeComponent = class PropertiesTreeComponent {
    constructor(t, c, p) {
        this.t = t;
        this.c = c;
        this.p = p;
        this.destroy$ = new Subject();
        // @Input() appContext: number;
        this.readonly$ = new BehaviorSubject(false);
        this.generalTreeControl = new NestedTreeControl(node => ([]));
        this.generalDataSource = new MatTreeNestedDataSource();
        this.generalShowEmptyFields = false;
        this.specificTreeControl = new NestedTreeControl(node => ([]));
        this.specificDataSource = new MatTreeNestedDataSource();
        this.specificShowEmptyFields = true;
    }
    ngOnInit() {
        // this.appContext = this.appContext || SysConfig.PK_UI_CONTEXT_DATAUNITS_EDITABLE;
        combineLatest(this.pkClass$).pipe(first(x => !x.includes(undefined)), takeUntil(this.destroy$))
            .subscribe(([pkClass]) => {
            this.generalTree$ = this.c.pipeBasicFieldsOfClass(pkClass);
            this.generalTree$.pipe(takeUntil(this.destroy$)).subscribe(data => {
                this.generalDataSource.data = data;
            });
            this.specificTree$ = this.c.pipeSpecificFieldOfClass(pkClass);
            this.specificTree$.pipe(takeUntil(this.destroy$)).subscribe(data => {
                this.specificDataSource.data = data;
            });
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    HostBinding('class.mat-typography')
], PropertiesTreeComponent.prototype, "true", void 0);
tslib_1.__decorate([
    Input()
], PropertiesTreeComponent.prototype, "pkEntity$", void 0);
tslib_1.__decorate([
    Input()
], PropertiesTreeComponent.prototype, "pkClass$", void 0);
tslib_1.__decorate([
    Input()
], PropertiesTreeComponent.prototype, "showOntoInfo$", void 0);
tslib_1.__decorate([
    Input()
], PropertiesTreeComponent.prototype, "readonly$", void 0);
PropertiesTreeComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-properties-tree',
        templateUrl: './properties-tree.component.html',
        styleUrls: ['./properties-tree.component.scss'],
        providers: [
            PropertiesTreeService
        ]
    })
], PropertiesTreeComponent);
export { PropertiesTreeComponent };
//# sourceMappingURL=properties-tree.component.js.map