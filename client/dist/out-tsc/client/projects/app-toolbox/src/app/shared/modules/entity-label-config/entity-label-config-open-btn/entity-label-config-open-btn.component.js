import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { EntityLabelConfigDialogComponent } from '../entity-label-config-dialog/entity-label-config-dialog.component';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
let EntityLabelConfigOpenBtnComponent = class EntityLabelConfigOpenBtnComponent {
    constructor(dialog, p) {
        this.dialog = dialog;
        this.p = p;
        this.destroy$ = new Subject();
    }
    ngOnInit() {
        if (!this.fkClass)
            console.error('You must provide a fkClass.');
    }
    open() {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
            const dialogData = {
                fkProject: pkProject,
                fkClass: this.fkClass
            };
            const d = this.dialog.open(EntityLabelConfigDialogComponent, {
                data: dialogData,
                height: 'calc(100% - 30px)',
                width: '850px',
                maxWidth: '100%',
            });
        });
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], EntityLabelConfigOpenBtnComponent.prototype, "fkClass", void 0);
EntityLabelConfigOpenBtnComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-entity-label-config-open-btn',
        templateUrl: './entity-label-config-open-btn.component.html',
        styleUrls: ['./entity-label-config-open-btn.component.scss']
    })
], EntityLabelConfigOpenBtnComponent);
export { EntityLabelConfigOpenBtnComponent };
//# sourceMappingURL=entity-label-config-open-btn.component.js.map