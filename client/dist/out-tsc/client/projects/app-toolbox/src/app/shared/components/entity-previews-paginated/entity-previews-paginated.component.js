import * as tslib_1 from "tslib";
import { Component, Input } from '@angular/core';
let EntityPreviewsPaginatedComponent = class EntityPreviewsPaginatedComponent {
    constructor(api) {
        this.api = api;
        this.limit = 10;
        this.offset = 0;
        this.dragEnabled = false;
        this.openTabOnClick = true;
        this.loading = false;
    }
    ngOnInit() {
        if (!this.pkEntities)
            throw new Error('You must provide pkEntities input');
        if (!this.pkProject)
            throw new Error('You must provide pkProject');
        this.limit = this.limit === undefined ? 10 : this.limit;
        this.offset = this.offset === undefined ? 0 : this.offset;
        this.dragEnabled = this.dragEnabled === undefined ? false : this.dragEnabled;
        this.openTabOnClick = this.openTabOnClick === undefined ? true : this.openTabOnClick;
        this.load();
    }
    load() {
        if (this.pkEntities && this.pkEntities.length) {
            this.api.warEntityPreviewControllerPaginatedListByPks({
                pkProject: this.pkProject,
                pkEntities: this.pkEntities,
                limit: this.limit,
                offset: this.offset
            })
                .subscribe(results => {
                this.items = results;
            });
        }
    }
    onPageChange(event) {
        this.limit = event.pageSize;
        this.offset = event.pageIndex * event.pageSize;
        this.load();
    }
};
tslib_1.__decorate([
    Input()
], EntityPreviewsPaginatedComponent.prototype, "pkEntities", void 0);
tslib_1.__decorate([
    Input()
], EntityPreviewsPaginatedComponent.prototype, "pkProject", void 0);
tslib_1.__decorate([
    Input()
], EntityPreviewsPaginatedComponent.prototype, "limit", void 0);
tslib_1.__decorate([
    Input()
], EntityPreviewsPaginatedComponent.prototype, "offset", void 0);
tslib_1.__decorate([
    Input()
], EntityPreviewsPaginatedComponent.prototype, "dragEnabled", void 0);
tslib_1.__decorate([
    Input()
], EntityPreviewsPaginatedComponent.prototype, "openTabOnClick", void 0);
EntityPreviewsPaginatedComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-entity-previews-paginated',
        templateUrl: './entity-previews-paginated.component.html',
        styleUrls: ['./entity-previews-paginated.component.scss']
    })
], EntityPreviewsPaginatedComponent);
export { EntityPreviewsPaginatedComponent };
//# sourceMappingURL=entity-previews-paginated.component.js.map