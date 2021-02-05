import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActiveProjectService, } from 'app/core';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from 'app/core/redux-store/model';

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
