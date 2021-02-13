import * as tslib_1 from "tslib";
import { Component, HostBinding } from '@angular/core';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
let ProjectDashboardComponent = class ProjectDashboardComponent {
    constructor(activatedRoute, p, ngRedux, slimLoadingBarService) {
        this.p = p;
        this.ngRedux = ngRedux;
        this.slimLoadingBarService = slimLoadingBarService;
        this.full = true;
        this.flexFh = true;
        this.destroy$ = new Subject();
        this.steps = {
            'step1': false,
            'step2': false,
            'step3': false,
            'step4': false,
            'step5': false
        };
        this.id = activatedRoute.snapshot.params['pkActiveProject'];
        this.showDashboard$ = p.dashboardVisible$;
        this.p.initProject(this.id);
        this.p.initProjectConfigData(this.id);
        this.ngRedux.select('activeProject').pipe(takeUntil(this.destroy$)).subscribe(p => this.project = p);
    }
    ngOnInit() {
        this.startLoading();
        // listen to the crm and add extract the classes ready to add.
        this.ngRedux.select(['activeProject', 'crm']).pipe(first(d => !!d), takeUntil(this.destroy$)).subscribe(crm => {
            const pkClassesInProject = [];
            for (const key in crm.classes) {
                if (crm.classes[key] && crm.classes[key].isInProject) {
                    pkClassesInProject.push(crm.classes[key].dfh_pk_class);
                }
            }
            // this.entityPreviewApi.search(this.id, '', pkClassesInProject, null, 1, 1)
            //   .subscribe(
            //     (response) => {
            //       this.entitiesCount = parseInt(response.totalCount, 10);
            //       this.completeLoading();
            //     },
            //     error => {
            //       this.resetLoading()
            //     }
            //   );
            // this.entityPreviewApi.search(this.id, '', DfhConfig.CLASS_PKS_SOURCE_PE_IT, null, 1, 1)
            //   .subscribe(
            //     (response) => {
            //       this.sourcesCount = parseInt(response.totalCount, 10);
            //       this.completeLoading();
            //     },
            //     error => {
            //       this.resetLoading()
            //     }
            //   );
        });
    }
    ngOnDestroy() {
        this.p.closeProject();
    }
    activateStep(stepId) {
        // deactivate all
        for (const key in this.steps) {
            if (this.steps[key])
                this.steps[key] = false;
        }
        // activate step
        if (this.steps.hasOwnProperty(stepId)) {
            this.steps[stepId] = true;
            this.activeSlideId = stepId;
        }
    }
    stopTour() {
        this.activateStep('');
        this.activeSlideId = undefined;
    }
    onSlide(event) {
        this.activateStep(event.current);
    }
    /**
     * Loading Bar Logic
     */
    startLoading() {
        this.slimLoadingBarService.progress = 20;
        this.slimLoadingBarService.start(() => {
        });
    }
    stopLoading() {
        this.slimLoadingBarService.stop();
    }
    completeLoading() {
        this.slimLoadingBarService.complete();
    }
    resetLoading() {
        this.slimLoadingBarService.reset();
    }
};
tslib_1.__decorate([
    HostBinding('class.gv-full')
], ProjectDashboardComponent.prototype, "full", void 0);
tslib_1.__decorate([
    HostBinding('class.gv-flex-fh')
], ProjectDashboardComponent.prototype, "flexFh", void 0);
ProjectDashboardComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-project-dashboard',
        templateUrl: './project-dashboard.component.html',
        styleUrls: ['./project-dashboard.component.scss']
    })
], ProjectDashboardComponent);
export { ProjectDashboardComponent };
//# sourceMappingURL=project-dashboard.component.js.map