import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ActiveProjectService } from 'app/core';

@Component({
  selector: 'gv-project-sandbox',
  templateUrl: './project-sandbox.component.html',
  styleUrls: ['./project-sandbox.component.scss']
})
export class ProjectSandboxComponent implements OnInit {

  @Input() pkProject;

  @Output() projectReady: EventEmitter<void> = new EventEmitter()

  constructor(
    private activeProjectService:ActiveProjectService
  ) {

    this.activeProjectService.onProjectChange().subscribe(success=>{
      this.projectReady.emit();
    })

   }

  ngOnInit() {
    if(this.pkProject) this.setProject();
  }


  setProject(){
    this.activeProjectService.setActiveProject(this.pkProject);
  }
}
