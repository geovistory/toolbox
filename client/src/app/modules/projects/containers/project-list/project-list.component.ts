import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { LoopBackAuth, LoopBackConfig, ProjectPreview, ProProject, ProTextProperty, PubAccount, PubAccountApi, U, IAppState, InfStatement } from 'app/core';
import { environment } from 'environments/environment';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { SysConfig } from '../../../../../../../src/common/config/sys-config';
import { ProjectsActions } from '../../api/projects.actions';
import { IProjectList } from '../../projects.model';
import { Router } from '@angular/router';
import * as Config from '../../../../../../../common/config/Config';
import { ProActions } from 'app/core/pro/pro.actions';
import { InfSelector } from 'app/core/inf/inf.service';
import { ProSelector } from 'app/core/pro/pro.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, map, switchMap, combineLatest, mergeMap } from 'rxjs/operators';
import { values } from 'ramda';
import { combineLatestOrEmpty } from 'app/core/util/combineLatestOrEmpty';


@Component({
  selector: 'gv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  // // TEMP 2020-03-10
  // destroy$ = new Subject<boolean>();

  projects: ProjectPreview[] = [];
  loadingComplete = false;


  config = Config;

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

  constructor(
    private accountApi: PubAccountApi,
    private authService: LoopBackAuth,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IAppState>,
    private actions: ProjectsActions,
    private router: Router,
    private pro: ProActions,
    private pro$: ProSelector
  ) {
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
    const fakeProjects: ProProject[] = [
      {
        fk_language: 345345,
        pk_entity: 4343
      },
      {
        fk_language: 4342,
        pk_entity: 1212
      }
    ]

    this.pro.project.loadSucceeded(fakeProjects, '')

    const fakeProjectLabels: ProTextProperty[] = [
      {
        fk_project: 4343,
        fk_pro_project: 4343,
        string: 'My project 1'
      } as ProTextProperty,
      {
        fk_project: 1212,
        fk_pro_project: 1212,
        string: 'My project 2'
      } as ProTextProperty,
    ]
    this.pro.text_property.loadSucceeded(fakeProjectLabels, '')

  }

  getProjects() {
    this.pro.project.loadOfAccount(this.authService.getCurrentUserId());


    this.startLoading();
    this.accountApi.listProjects(this.authService.getCurrentUserId()).subscribe(
      (accounts: Array<PubAccount>) => {

        this.projects = accounts[0].projects.map((p: ProProject) => U.proProjectToProjectPreview(p));

        this.ngRedux.dispatch(this.actions.loadProjectsSucceeded(this.projects))

        this.completeLoading();
      },
      (error) => {
        if (error.statusCode === 401) {
          this.router.navigate(['login'], {
            queryParams: {
              redirectUrl: 'projects'
            }
          })
        }
      });
  }




  open() {
    alert('TODO: open project')
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

  // TEMP 2020-03-10
  // ngOnDestroy() {
  //   this.destroy$.next(true);
  //   this.destroy$.unsubscribe();
  // }

}
