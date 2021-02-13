import * as tslib_1 from "tslib";
import { Component, Output, EventEmitter, Input } from '@angular/core';
let ProjectSandboxComponent = class ProjectSandboxComponent {
    constructor(activeProjectService, ngRedux) {
        this.activeProjectService = activeProjectService;
        this.projectReady = new EventEmitter();
        ngRedux.select(['activeProject']).subscribe(success => {
            this.projectReady.emit();
        });
    }
    ngOnInit() {
        if (this.pkProject)
            this.setProject();
    }
    setProject() {
        this.activeProjectService.initProject(this.pkProject);
    }
};
tslib_1.__decorate([
    Input()
], ProjectSandboxComponent.prototype, "pkProject", void 0);
tslib_1.__decorate([
    Output()
], ProjectSandboxComponent.prototype, "projectReady", void 0);
ProjectSandboxComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-project-sandbox',
        templateUrl: './project-sandbox.component.html',
        styleUrls: ['./project-sandbox.component.scss']
    })
], ProjectSandboxComponent);
export { ProjectSandboxComponent };
//# sourceMappingURL=project-sandbox.component.js.map