import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FireLoopRef } from '../shared/sdk/models/FireLoopRef';
import { Project } from '../shared/sdk/models/Project';
import { RealTime } from '../shared/sdk/services/core/real.time';

@Component({
  selector: 'gv-project-settings-profile',
  templateUrl: './project-settings-profile.component.html',
  styleUrls: ['./project-settings-profile.component.scss']
})
export class ProjectSettingsProfileComponent implements OnInit {
  private ProjectReference: FireLoopRef<Project>;
  loading: boolean = false;
  errorMessages: any;
  project:Project;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(RealTime) private realTime: RealTime
  ) {
    this.realTime
    .onReady()
    .subscribe(() => {
      this.ProjectReference = this.realTime.FireLoop.ref<Project>(Project);
      this.getProject();
    });
  }

  getProject() {
    this.loading = true;
    this.ProjectReference.on('change', {
      where: { "id": 1 }
    }).subscribe(
      (projects: Project[]) => {
        this.project = projects[0];
        this.loading = false
      });
    }

    ngOnInit() {
    }

    delete() {
      this.loading = true;
      this.errorMessages = {};
      this.ProjectReference.remove(this.project).subscribe(
        data => {
          this.loading = false;
        },
        error => {
          // TODO: Alert
          this.errorMessages = error.error.details.messages;
          this.loading = false;
        }
      );
    }
  }
