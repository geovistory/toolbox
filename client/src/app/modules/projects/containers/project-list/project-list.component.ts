import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { LoopBackAuth, LoopBackConfig, ProjectPreview, ProProject, ProTextProperty, PubAccount, PubAccountApi, U } from 'app/core';
import { environment } from 'environments/environment';
import { SlimLoadingBarService } from '@cime/ngx-slim-loading-bar';
import { SysConfig } from '../../../../../../../src/common/config/sys-config';
import { ProjectsActions } from '../../api/projects.actions';
import { IProjectList } from '../../projects.model';
import { Router } from '@angular/router';
import * as Config from '../../../../../../../common/config/Config';


@Component({
  selector: 'gv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {


  projects: ProjectPreview[] = [];
  loadingComplete = false;


  config = Config;

  constructor(
    private accountApi: PubAccountApi,
    private authService: LoopBackAuth,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IProjectList>,
    private actions: ProjectsActions,
    private router: Router,
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.startLoading();
    this.accountApi.listProjects(this.authService.getCurrentUserId()).subscribe(
      (accounts: Array<PubAccount>) => {

        this.projects = accounts[0].projects.map((p: ProProject) => U.proProjectToProjectPreview(p));

        this.ngRedux.dispatch(this.actions.loadProjectsSucceeded(this.projects))

        this.completeLoading();
      },
      (error) => {
        if(error.statusCode === 401){
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

}
