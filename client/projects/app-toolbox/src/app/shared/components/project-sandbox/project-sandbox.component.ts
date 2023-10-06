import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IAppState } from "@kleiolab/lib-redux";
import { NgRedux } from '@ngrx/store';
import { ActiveProjectService, } from "projects/app-toolbox/src/app/core/active-project/active-project.service";

@Component({
  selector: 'gv-project-sandbox',
  templateUrl: './project-sandbox.component.html',
  styleUrls: ['./project-sandbox.component.scss']
})
export class ProjectSandboxComponent implements OnInit {

  @Input() pkProject;

  @Output() projectReady: EventEmitter<void> = new EventEmitter()

  constructor(
    private activeProjectService: ActiveProjectService,
    ngRedux: NgRedux<IAppState>
  ) {

    ngRedux.select(['activeProject']).subscribe(success => {
      this.projectReady.emit();
    })

  }

  ngOnInit() {
    if (this.pkProject) this.setProject();
  }


  setProject() {
    this.activeProjectService.initProject(this.pkProject);
  }
}
