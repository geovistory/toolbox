import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import {LoopBackConfig} from './../shared/sdk/lb.config';
import {RealTime} from './../shared/sdk/services/core/real.time';
import {Project} from './../shared/sdk/models/Project';
import {FireLoopRef} from './../shared/sdk/models/FireLoopRef';
import {environment} from './../../environments/environment';

@Component({
  selector: 'gv-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  private projects: Project[];
  private ProjectReference: FireLoopRef<Project>;
  private loading: boolean = false;

  constructor(private realTime: RealTime) {
    LoopBackConfig.setBaseURL(environment.baseUrl);
    LoopBackConfig.setApiVersion(environment.apiVersion);

    this.realTime
    .onReady()
    .subscribe(() => {
      this.ProjectReference = this.realTime.FireLoop.ref<Project>(Project);
      this.getProjects();
    });
  }

  ngOnInit() {

  }

  getProjects() {
    this.loading = true;
    this.ProjectReference.on('change').subscribe(
     (projects: Array<Project>) => {
        this.projects = projects;
        this.loading = false
      });
    }

    open(){
      alert('TODO: open project')
    }

  }
