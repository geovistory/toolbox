import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { RealTime } from './../shared/sdk/services/core/real.time';
import { Project } from './../shared/sdk/models/Project';
import { Language } from '../shared/sdk/models/Language';
import { FireLoopRef } from './../shared/sdk/models/FireLoopRef';

@Component({
  selector: 'gv-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {
  private ProjectReference: FireLoopRef<Project>;
  private LanguageReference: FireLoopRef<Language>;
  loading: boolean = false;
  errorMessages: any;
  model = new Project();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(RealTime) private realTime: RealTime
  ) {
    this.realTime
    .onReady()
    .subscribe(() => {
      this.ProjectReference = this.realTime.FireLoop.ref<Project>(Project);
      this.LanguageReference = this.realTime.FireLoop.ref<Language>(Language);
    });
  }

  request() {
    this.loading = true;
    this.errorMessages = {};
    this.ProjectReference.create(this.model).subscribe(
      data => {
        this.loading = false;
        this.router.navigate(['../projects'], {relativeTo: this.activatedRoute})
      },
      error => {
        // TODO: Alert
        this.errorMessages = error.error.details.messages;
        this.loading = false;
      }
    );
  }

}
