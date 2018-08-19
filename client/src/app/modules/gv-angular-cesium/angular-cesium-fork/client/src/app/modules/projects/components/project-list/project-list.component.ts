import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs';
import { Project, Account, AccountApi, LoopBackAuth, LoopBackConfig } from 'app/core';
import { environment } from 'environments/environment';
import { NgRedux } from '@angular-redux/store';
import { IProjectList } from '../../projects.model';
import { ProjectsActions } from '../../api/projects.actions';


@Component({
  selector: 'gv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

 
  projects: Project[] = [];
  loadingComplete = false;



  constructor(
    private accountApi: AccountApi,
    private authService: LoopBackAuth,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IProjectList>,
    private actions: ProjectsActions
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
      (accounts: Array<Account>) => {

        this.projects = accounts[0].projects;

        this.actions.loadProjectsSucceeded(this.projects)
        
        this.completeLoading();
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