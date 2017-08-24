import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import {RealTime} from './../shared/sdk/services/core/real.time';
import {Project} from './../shared/sdk/models/Project';
import {FireLoopRef} from './../shared/sdk/models/FireLoopRef';

@Component({
  selector: 'gv-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss']
})
export class ProjectCreateComponent {
  private project: Project;
  private ProjectReference: FireLoopRef<Project>;
  private loading: boolean = false;
  model: any = {};


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    @Inject(RealTime) private realTime: RealTime
  ) {
    this.realTime
    .onReady()
    .subscribe(() => {
      this.ProjectReference = this.realTime.FireLoop.ref<Project>(Project);
    });
  }

  request() {
    this.ProjectReference.create(this.model).subscribe(
      data => {
        this.router.navigate(['../projects'], {relativeTo: this.activatedRoute})
      },
      err => console.log(err)
    );
  }

}
