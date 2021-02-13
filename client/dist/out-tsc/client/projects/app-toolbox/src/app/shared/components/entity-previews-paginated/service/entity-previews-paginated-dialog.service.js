import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';
import { EntityPreviewsPaginatedDialogComponent } from '../entity-previews-paginated-dialog/entity-previews-paginated-dialog.component';
let EntityPreviewsPaginatedDialogService = class EntityPreviewsPaginatedDialogService {
    constructor(dialog, p) {
        this.dialog = dialog;
        this.p = p;
    }
    open(ofProjectPreferred, pkEntities, title, paragraphs) {
        if (ofProjectPreferred) {
            this.p.pkProject$.pipe(first()).subscribe(pkProject => {
                this._open(pkProject, pkEntities, title, paragraphs);
            });
        }
        else {
            this._open(0, pkEntities, title, paragraphs);
        }
    }
    _open(pkProject, pkEntities, title, paragraphs) {
        const data = {
            title,
            pkEntities,
            pkProject,
            paragraphs
        };
        this.dialog.open(EntityPreviewsPaginatedDialogComponent, { data });
    }
};
EntityPreviewsPaginatedDialogService = tslib_1.__decorate([
    Injectable({
        providedIn: 'root'
    })
], EntityPreviewsPaginatedDialogService);
export { EntityPreviewsPaginatedDialogService };
//# sourceMappingURL=entity-previews-paginated-dialog.service.js.map