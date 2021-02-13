import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
let EntityPreviewComponent = class EntityPreviewComponent {
    constructor(p, ap) {
        this.p = p;
        this.ap = ap;
        this.destroy$ = new Subject();
        this.dragEnabled = true;
        this.openTabOnClick = false;
        this.showId = false;
    }
    ngOnInit() {
        // lazy load the preview, if only pkEntity given
        if (this.pkEntity && !this.preview) {
            this.ap.streamEntityPreview(this.pkEntity)
                .pipe(takeUntil(this.destroy$))
                .subscribe(preview => this.preview = preview);
        }
    }
    openInNewTab() {
        this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class);
    }
    addAndOpenInNewTab() {
        this.p.addEntityToProject(this.preview.pk_entity, () => {
            this.p.addEntityTab(this.preview.pk_entity, this.preview.fk_class);
        });
    }
    editEntity() {
    }
    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
};
tslib_1.__decorate([
    Input()
], EntityPreviewComponent.prototype, "preview", void 0);
tslib_1.__decorate([
    Input()
], EntityPreviewComponent.prototype, "pkEntity", void 0);
tslib_1.__decorate([
    Input()
], EntityPreviewComponent.prototype, "dragEnabled", void 0);
tslib_1.__decorate([
    Input()
], EntityPreviewComponent.prototype, "openTabOnClick", void 0);
tslib_1.__decorate([
    Input()
], EntityPreviewComponent.prototype, "showId", void 0);
EntityPreviewComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-entity-preview',
        templateUrl: './entity-preview.component.html',
        styleUrls: ['./entity-preview.component.scss']
    })
], EntityPreviewComponent);
export { EntityPreviewComponent };
//# sourceMappingURL=entity-preview.component.js.map