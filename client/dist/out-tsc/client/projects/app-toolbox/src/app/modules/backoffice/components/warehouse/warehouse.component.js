import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { Subject } from 'rxjs';
let WarehouseComponent = class WarehouseComponent {
    constructor(rootEpics) {
        this.rootEpics = rootEpics;
        // emits true on destroy of this component
        this.destroy$ = new Subject();
    }
    ngOnInit() {
    }
    // createAllEntityPreviews() {
    //   this.createEntityPreviewsLoading = true;
    //   this.warEntityPreviewApi.createAll().pipe(
    //     takeUntil(this.destroy$)
    //   ).subscribe(
    //     (res) => {
    //       this.createEntityPreviewsLoading = false;
    //       this.createEntityPreviewsInfo = res;
    //     },
    //     (err) => {
    //       this.createEntityPreviewsLoading = false;
    //       this.createEntityPreviewsInfo = err;
    //     })
    // }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
WarehouseComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-warehouse',
        templateUrl: './warehouse.component.html',
        styleUrls: ['./warehouse.component.css']
    })
], WarehouseComponent);
export { WarehouseComponent };
//# sourceMappingURL=warehouse.component.js.map