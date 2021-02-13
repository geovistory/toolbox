import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { QuillOpsToStrPipe } from 'projects/app-toolbox/src/app/shared/pipes/quill-delta-to-str/quill-delta-to-str.pipe';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
let FactoidListComponent = class FactoidListComponent {
    constructor(p, factoidService, ref, c) {
        this.p = p;
        this.factoidService = factoidService;
        this.ref = ref;
        this.c = c;
        this.destroy$ = new Subject();
        this.totalLength = 0;
        this.pageIndex = 0;
        this.pageSize = 2;
        this.loading = false;
    }
    ngOnInit() {
        this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => this.pkProject = pkProject);
        this.askForFactoids();
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
    onPageChange(event) {
        this.pageIndex = event.pageIndex;
        this.pageSize = event.pageSize;
        this.askForFactoids();
    }
    askForFactoids() {
        this.factoidsEntities = [];
        this.loading = true;
        this.factoidService.factoidControllerFactoidsFromEntity(this.pkProject + '', this.pkEntity + '', this.pageSize + '', this.pageIndex + '')
            .pipe(first(), takeUntil(this.destroy$)).subscribe(resp => {
            this.totalLength = resp.totalLength;
            this.factoidsEntities = resp.factoidEntities;
            this.loading = false;
        });
    }
    stringify(objet) {
        return JSON.stringify(objet);
    }
};
tslib_1.__decorate([
    Input()
], FactoidListComponent.prototype, "pkEntity", void 0);
FactoidListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-factoid-list',
        templateUrl: './factoid-list.component.html',
        styleUrls: ['./factoid-list.component.scss'],
        providers: [
            QuillOpsToStrPipe
        ]
    })
], FactoidListComponent);
export { FactoidListComponent };
//# sourceMappingURL=factoid-list.component.js.map