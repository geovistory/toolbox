import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { AddOrCreateEntityDialogComponent } from '../components/add-or-create-entity-dialog/add-or-create-entity-dialog.component';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
let BaseModalsService = class BaseModalsService {
    constructor(dialog) {
        this.dialog = dialog;
    }
    /**
     * Returns an observable that emits the added entity
     */
    openModalCreateOrAddEntity(config) {
        const observable = new Subject();
        // this.ngRedux.dispatch(this.actions.openAddForm(config));
        this.dialog.open(AddOrCreateEntityDialogComponent, {
            // height: '90%',
            // width: '90%',
            height: 'calc(100% - 30px)',
            width: '980px',
            maxWidth: '100%',
            data: config
        })
            .afterClosed().pipe(first()).subscribe(result => {
            // this.ngRedux.dispatch(this.actions.closeAddForm());
            if (result)
                observable.next(result);
        });
        return observable;
    }
};
BaseModalsService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], BaseModalsService);
export { BaseModalsService };
//# sourceMappingURL=base-modals.service.js.map