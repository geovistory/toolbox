import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActiveProjectService, } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { NgRedux } from '@angular-redux/store';
import { IAppState } from "@kleiolab/lib-redux";

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
