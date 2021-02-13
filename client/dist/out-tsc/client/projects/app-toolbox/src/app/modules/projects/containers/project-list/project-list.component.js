import * as tslib_1 from "tslib";
import { Component } from '@angular/core';
import { LoopBackConfig } from '@kleiolab/lib-sdk-lb3';
import { U } from "projects/app-toolbox/src/app/core/util/util";
import { environment } from 'projects/app-toolbox/src/environments/environment';
import * as Config from '../../../../../../../../../server/lb3app/common/config/Config';
let ProjectListComponent = class ProjectListComponent {
    // TEMP 2020-03-10
    // temp;
    // tempProjectLabel;
    // tempProjectLabel$;
    // tempProjects$: Observable<ProProject[]>;
    // tempProjectPreview$: Observable<{
    //   pk_entity: number,
    //   fk_language: number,
    //   label: string
    // }[]>;
    constructor(accountApi, authService, slimLoadingBarService, ngRedux, actions, router, pro, pro$) {
        this.accountApi = accountApi;
        this.authService = authService;
        this.slimLoadingBarService = slimLoadingBarService;
        this.ngRedux = ngRedux;
        this.actions = actions;
        this.router = router;
        this.pro = pro;
        this.pro$ = pro$;
        // // TEMP 2020-03-10
        // destroy$ = new Subject<boolean>();
        this.projects = [];
        this.loadingComplete = false;
        this.config = Config;
        LoopBackConfig.setBaseURL(environment.baseUrl);
        LoopBackConfig.setApiVersion(environment.apiVersion);
    }
    ngOnInit() {
        // TEMP 2020-03-10
        // this.pro$.project$.by_pk_entity$.all$
        //   .subscribe(projects => {
        //     this.temp = projects;
        //     if (projects) {
        //       Object.keys(projects).forEach(key => {
        //         const p = projects[key];
        //       })
        //     }
        //   });
        // // TEMP 2020-03-10
        // this.ngRedux.select([
        //   'pro',
        //   'text_property',
        //   'by_fks',
        //   '4343_null_null_null_null_null_null'
        // ])
        //   .pipe(takeUntil(this.destroy$))
        //   .subscribe(textProp => {
        //     this.tempProjectLabel = textProp;
        //   })
        // // TEMP 2020-03-10
        // this.tempProjectLabel$ = this.pro$.text_property$.by_fks$.key('4343_null_null_null_null_null_null')
        // this.tempProjects$ = this.pro$.project$.by_pk_entity$.all$
        //   .pipe(
        //     map(projectsByPk => {
        //       const projects: ProProject[] = [];
        //       for (const key in projectsByPk) {
        //         if (projectsByPk.hasOwnProperty(key)) {
        //           const element = projectsByPk[key];
        //           projects.push(element)
        //         }
        //       }
        //       return projects;
        //       //values(projectsByPk)
        //     })
        //   );
        // // TEMP 2020-03-10
        // this.tempProjectPreview$ = this.tempProjects$.pipe(
        //   switchMap((projects) => {
        //     const previews$ = projects.map((p) => {
        //       return this.pro$.text_property$.by_fks$.key(p.pk_entity + '_null_null_null_null_null_null')
        //         .pipe(
        //           map((textProp) => {
        //             return {
        //               pk_entity: p.pk_entity,
        //               fk_language: p.fk_language,
        //               label: textProp.string
        //             }
        //           })
        //         )
        //     })
        //     return combineLatestOrEmpty(previews$)
        //   })
        // )
        this.getProjects();
        // TEMP 2020-03-10
        // this.getFakeProjects(7);
    }
    /**
     * TEMP 2020-03-10
     * temporary fake data
     *
     */
    getFakeProjects(pkEntity) {
        const fakeProjects = [
            {
                fk_language: 345345,
                pk_entity: 4343
            },
            {
                fk_language: 4342,
                pk_entity: 1212
            }
        ];
        this.pro.project.loadSucceeded(fakeProjects, '');
        const fakeProjectLabels = [
            {
                fk_project: 4343,
                fk_pro_project: 4343,
                string: 'My project 1'
            },
            {
                fk_project: 1212,
                fk_pro_project: 1212,
                string: 'My project 2'
            },
        ];
        this.pro.text_property.loadSucceeded(fakeProjectLabels, '');
    }
    getProjects() {
        this.pro.project.loadOfAccount(this.authService.getCurrentUserId());
        this.startLoading();
        this.accountApi.listProjects(this.authService.getCurrentUserId()).subscribe((accounts) => {
            this.projects = accounts[0].projects.map((p) => U.proProjectToProjectPreview(p));
            this.ngRedux.dispatch(this.actions.loadProjectsSucceeded(this.projects));
            this.completeLoading();
        }, (error) => {
            if (error.statusCode === 401) {
                this.router.navigate(['login'], {
                    queryParams: {
                        redirectUrl: 'projects'
                    }
                });
            }
        });
    }
    open() {
        alert('TODO: open project');
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
        this.loadingComplete = true;
    }
};
ProjectListComponent = tslib_1.__decorate([
    Component({
        selector: 'gv-project-list',
        templateUrl: './project-list.component.html',
        styleUrls: ['./project-list.component.scss']
    })
], ProjectListComponent);
export { ProjectListComponent };
//# sourceMappingURL=project-list.component.js.map