import { NgRedux } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { LoopBackAuth, LoopBackConfig, ProProject, PubAccount, PubAccountApi } from 'app/core';
import { environment } from 'environments/environment';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ProjectsActions } from '../../api/projects.actions';
import { IProjectList } from '../../projects.model';



@Component({
  selector: 'gv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {


  projects: ProProject[] = [];
  loadingComplete = false;



  constructor(
    private accountApi: PubAccountApi,
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
      (accounts: Array<PubAccount>) => {

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