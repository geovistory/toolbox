import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActiveProjectService } from 'app/core';

@Component({
  selector: 'gv-project-sandbox',
  templateUrl: './project-sandbox.component.html',
  styleUrls: ['./project-sandbox.component.scss']
})
export class ProjectSandboxComponent implements OnInit {

  pkProject;

  @Output() projectReady: EventEmitter<void> = new EventEmitter()

  constructor(
    private activeProjectService:ActiveProjectService
  ) { }

  ngOnInit() {
    this.activeProjectService.onProjectChange().subscribe(success=>{
      this.projectReady.emit();
    })
  }


  setProject(){
    this.activeProjectService.setActiveProject(this.pkProject);
  }
}
