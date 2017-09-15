import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import {LoopBackConfig} from './../shared/sdk/lb.config';
import {Project} from './../shared/sdk/models/Project';
import {environment} from './../../environments/environment';
import { AccountApi } from '../shared/sdk/services/custom/Account';
import { LoopBackAuth } from '../shared/sdk/services/core/auth.service';

@Component({
  selector: 'gv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  projects: Project[] = [];
  loading: boolean = false;

  constructor(
    private accountApi: AccountApi,
    private authService: LoopBackAuth
  ) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);
  }

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    this.loading = true;
    this.accountApi.listProjects(this.authService.getCurrentUserId()).subscribe(
      (projects: Array<Project>) => {
        this.projects = projects;
        this.loading = false
      });
    }

    open(){
      alert('TODO: open project')
    }

  }