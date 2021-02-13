import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { combineLatest } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { first } from 'rxjs/operators';
let PropertiesTreeService = class PropertiesTreeService {
    constructor(p) {
        this.p = p;
    }
    updateOrder(event, items$) {
        combineLatest(this.p.pkProject$, items$).pipe(first(([p, i]) => (i && i.length > 0))).subscribe(([pkProject, items]) => {
            moveItemInArray(items, event.previousIndex, event.currentIndex);
            const changedEprs = [];
            // check, if needs update
            for (let i = 0; i < items.length; i++) {
                const ipr = items[i].projRel;
                // if the ord_num is wrong
                // TODO: add support for ord_num_of_range
                if (ipr.ord_num_of_domain != i) {
                    changedEprs.push(Object.assign({}, ipr, { ord_num_of_domain: i }));
                }
            }
            if (changedEprs.length)
                this.p.pro$.info_proj_rel.upsert(changedEprs, pkProject);
        });
    }
};
PropertiesTreeService = tslib_1.__decorate([
    Injectable()
], PropertiesTreeService);
export { PropertiesTreeService };
//# sourceMappingURL=properties-tree.service.js.map