import * as tslib_1 from "tslib";
import { Component, HostBinding, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { SysConfig } from 'projects/app-toolbox/src/app/core';
import { TabLayoutService } from 'projects/app-toolbox/src/app/shared/components/tab-layout/tab-layout.service';
import { GvAnalysisService } from '../../services/analysis.service';
let AnalysisDetailComponent = class AnalysisDetailComponent {
    constructor(ref, p, ts, a) {
        this.ref = ref;
        this.p = p;
        this.ts = ts;
        this.a = a;
        this.flexFh = true;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
        this.sysConfig = SysConfig;
    }
    ngOnInit() {
        this.a.pkEntity = this.pkEntity;
        this.a.fkAnalysisType = this.fkAnalysisType;
        this.t = this.ts.create(this.basePath[2], this.ref, this.destroy$);
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], AnalysisDetailComponent.prototype, "flexFh", void 0);
tslib_1.__decorate([
    Input()
], AnalysisDetailComponent.prototype, "basePath", void 0);
tslib_1.__decorate([
    Input()
], AnalysisDetailComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], AnalysisDetailComponent.prototype, "fkAnalysisType", void 0);
AnalysisDetailComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-analysis-detail',
        templateUrl: './analysis-detail.component.html',
        styleUrls: ['./analysis-detail.component.scss'],
        providers: [TabLayoutService, GvAnalysisService]
    })
], AnalysisDetailComponent);
export { AnalysisDetailComponent };
//# sourceMappingURL=analysis-detail.component.js.map