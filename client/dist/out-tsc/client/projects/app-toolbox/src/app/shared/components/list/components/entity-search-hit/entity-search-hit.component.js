import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let EntitySearchHitComponent = class EntitySearchHitComponent {
    constructor() {
        this.onAdd = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onOpenEntityPreview = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.headlineItems = [];
    }
    ngOnInit() {
        this.projectsCount = this.hit.projects ? this.hit.projects.length : undefined;
        if (this.hit.fk_project) {
            this.isInProject = true;
        }
        else {
            this.repositorySearch = true;
            this.isInProject = false;
        }
        this.entityPreview = {
            pk_entity: this.hit.pk_entity,
            fk_project: this.hit.fk_project,
            project: this.hit.fk_project,
            fk_class: this.hit.fk_class,
            entity_label: this.hit.entity_label,
            entity_type: this.hit.entity_type,
            class_label: this.hit.class_label,
            type_label: this.hit.type_label,
            time_span: this.hit.time_span
        };
    }
    add() {
        this.onAdd.emit(this.hit.pk_entity);
    }
    open() {
        this.onOpen.emit(this.hit.pk_entity);
        this.onOpenEntityPreview.emit(this.entityPreview);
    }
    select() {
        this.onSelect.emit(this.hit.pk_entity);
    }
    linkClicked() {
        if (!this.repositorySearch) {
            if (this.isInProject) {
                this.open();
            }
            else {
                this.add();
            }
        }
    }
};
tslib_1.__decorate([
    Input()
], EntitySearchHitComponent.prototype, "hit", void 0);
tslib_1.__decorate([
    Input()
], EntitySearchHitComponent.prototype, "selectStatementRange", void 0);
tslib_1.__decorate([
    Input()
], EntitySearchHitComponent.prototype, "repositorySearch", void 0);
tslib_1.__decorate([
    Output()
], EntitySearchHitComponent.prototype, "onAdd", void 0);
tslib_1.__decorate([
    Output()
], EntitySearchHitComponent.prototype, "onOpen", void 0);
tslib_1.__decorate([
    Output()
], EntitySearchHitComponent.prototype, "onOpenEntityPreview", void 0);
tslib_1.__decorate([
    Output()
], EntitySearchHitComponent.prototype, "onSelect", void 0);
EntitySearchHitComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-entity-search-hit',
        templateUrl: './entity-search-hit.component.html',
        styleUrls: ['./entity-search-hit.component.scss']
    })
], EntitySearchHitComponent);
export { EntitySearchHitComponent };
//# sourceMappingURL=entity-search-hit.component.js.map