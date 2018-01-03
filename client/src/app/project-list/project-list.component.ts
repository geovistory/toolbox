import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs';

import {LoopBackConfig} from './../shared/sdk/lb.config';
import {Project} from './../shared/sdk/models/Project';
import {environment} from './../../environments/environment';
import { AccountApi } from '../shared/sdk/services/custom/Account';
import { LoopBackAuth } from '../shared/sdk/services/core/auth.service';
import { Account } from '../shared/sdk/models/Account';

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
    private slimLoadingBarService: SlimLoadingBarService
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
      this.completeLoading();
      });
    }

    open(){
      alert('TODO: open project')
    }


    /**
     * Loading Bar Logic
     */

    startLoading() {
      this.slimLoadingBarService.progress = 20;
      this.slimLoadingBarService.start(() => {
        this.loadingComplete = true;
      });
    }

    stopLoading() {
      this.slimLoadingBarService.stop();
    }

    completeLoading() {
      this.slimLoadingBarService.complete();
    }

  }