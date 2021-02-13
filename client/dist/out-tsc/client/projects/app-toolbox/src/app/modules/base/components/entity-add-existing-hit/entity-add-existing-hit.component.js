import * as tslib_1 from "tslib";
import { Component, EventEmitter, Input, Output } from '@angular/core';
let EntityAddExistingHitComponent = class EntityAddExistingHitComponent {
    constructor() {
        this.onAdd = new EventEmitter();
        this.onOpen = new EventEmitter();
        this.onSelect = new EventEmitter();
        this.headlineItems = [];
    }
    ngOnInit() {
        if (!this.alreadyInProjectBtnText)
            throw Error('please provide a alreadyInProjectBtnText');
        if (!this.notInProjectBtnText)
            throw Error('please provide a notInProjectBtnText');
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
            project: this.hit.project,
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
], EntityAddExistingHitComponent.prototype, "hit", void 0);
tslib_1.__decorate([
    Input()
], EntityAddExistingHitComponent.prototype, "alreadyInProjectBtnText", void 0);
tslib_1.__decorate([
    Input()
], EntityAddExistingHitComponent.prototype, "notInProjectBtnText", void 0);
tslib_1.__decorate([
    Input()
], EntityAddExistingHitComponent.prototype, "repositorySearch", void 0);
tslib_1.__decorate([
    Output()
], EntityAddExistingHitComponent.prototype, "onAdd", void 0);
tslib_1.__decorate([
    Output()
], EntityAddExistingHitComponent.prototype, "onOpen", void 0);
tslib_1.__decorate([
    Output()
], EntityAddExistingHitComponent.prototype, "onSelect", void 0);
EntityAddExistingHitComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-entity-add-existing-hit',
        templateUrl: './entity-add-existing-hit.component.html',
        styleUrls: ['./entity-add-existing-hit.component.scss']
    })
], EntityAddExistingHitComponent);
export { EntityAddExistingHitComponent };
//# sourceMappingURL=entity-add-existing-hit.component.js.map