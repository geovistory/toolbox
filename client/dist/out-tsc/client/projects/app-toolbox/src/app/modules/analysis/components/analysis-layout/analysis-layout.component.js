import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, first, switchMap, takeUntil, tap } from 'rxjs/operators';
let AnalysisLayoutComponent = class AnalysisLayoutComponent {
    constructor(ts, p, a) {
        this.a = a;
        this.destroy$ = new Subject();
        this.flexFh = true;
        this.pkAnalysis$ = new Subject();
        this.t = ts.t;
        this.t.defaultSizeRight = 50;
        this.t.setLayoutMode('both');
        this.pkAnalysis$.pipe(tap((pk) => {
            if (!pk)
                this.t.setTabTitle('New Analysis *');
        }), filter(pk => !!pk), switchMap(pkAnalysis => p.pro$.analysis$.by_pk_entity$.key(pkAnalysis.toString())), takeUntil(this.destroy$)).subscribe(proAnalysis => {
            if (proAnalysis === undefined) {
                this.deleted = true;
            }
            else {
                this.t.setTabTitle(proAnalysis.name);
            }
        });
        this.pkAnalysis = this.a.pkEntity;
    }
    set pkAnalysis(pk) {
        this._pkAnalysis = pk;
        this.pkAnalysis$.next(pk);
    }
    get pkAnalysis() {
        return this._pkAnalysis;
    }
    ngOnInit() {
    }
    run() {
        this.a.runAnalysis();
    }
    create() {
        this.a.createAnalysis().pipe(first(), takeUntil(this.destroy$)).subscribe(pkAnalysis => {
            this.pkAnalysis = pkAnalysis;
        });
    }
    save() {
        this.a.saveAnalysis();
    }
    copy() {
        this.a.copyAnalysis();
    }
    rename() {
        this.a.renameAnalysis();
    }
    delete() {
        this.a.deleteAnalysis();
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], AnalysisLayoutComponent.prototype, "flexFh", void 0);
AnalysisLayoutComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-analysis-layout',
        templateUrl: './analysis-layout.component.html',
        styleUrls: ['./analysis-layout.component.scss']
    })
], AnalysisLayoutComponent);
export { AnalysisLayoutComponent };
//# sourceMappingURL=analysis-layout.component.js.map