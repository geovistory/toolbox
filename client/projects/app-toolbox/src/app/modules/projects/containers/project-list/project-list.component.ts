import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAppState, LoadingBarActions, ProjectPreview } from '@kleiolab/lib-redux';
import { LoopBackAuth, LoopBackConfig, ProProject, PubAccount, PubAccountApi } from '@kleiolab/lib-sdk-lb3';
import { Utils } from 'projects/app-toolbox/src/app/core/util/util';
import { environment } from 'projects/app-toolbox/src/environments/environment';
import { ReduxMainService } from 'projects/lib-redux/src/lib/redux-store/state-schema/services/reduxMain.service';
import { first } from 'rxjs/operators';
import * as Config from '../../../../../../../../../server/lb3app/common/config/Config';
import { ProjectsActions } from '../../api/projects.actions';


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
    private loadingBarActions: LoadingBarActions,
    private ngRedux: NgRedux<IAppState>,
    private actions: ProjectsActions,
    private router: Router,
    private dataService: ReduxMainService
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  ngOnInit() {


    this.getProjects();

  }

  getProjects() {
    this.dataService.loadProjectsOfAccount();
    this.loadingBarActions.addJob();


    this.accountApi.listProjects(this.authService.getCurrentUserId())
      .pipe(first())
      .subscribe(
        (accounts: Array<PubAccount>) => {

          this.projects = accounts[0].projects.map((p: ProProject) => Utils.proProjectToProjectPreview(p));

          this.ngRedux.dispatch(this.actions.loadProjectsSucceeded(this.projects))

          this.loadingComplete = true;
          this.loadingBarActions.removeJob()
        },
        (error) => {
          this.loadingBarActions.removeJob()
          if (error.statusCode === 401) {
            this.router.navigate(['login'], {
              queryParams: {
                redirectUrl: 'projects'
              }
            })
          }
        }
      );
  }




  open() {
    alert('TODO: open project')
  }

  /**
   * Loading Bar Logic
   */





  // TEMP 2020-03-10
  // ngOnDestroy() {
  //   this.destroy$.next(true);
  //   this.destroy$.unsubscribe();
  // }

}
