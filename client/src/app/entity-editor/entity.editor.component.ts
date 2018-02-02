import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { UtilitiesService } from '../shared/services/utilities.service';
import { KeyboardService } from '../shared/services/keyboard.service';

@Component({
  selector: 'gv-entity-editor',
  templateUrl: './entity.editor.component.html',
  styleUrls: ['./entity.editor.component.scss']
})
export class EntityEditorComponent implements OnInit {

  /**
  * Properties
  */

  // Primary key of the Persistent Item to be viewed or edited
  pkEntity:number;

  // State that will be passed to the included PeItComponent on init
  peItState:string;

  // Flag to indicate that the activeProject is set
  activeProjectReady:boolean;

  constructor(
    private activatedRoute: ActivatedRoute,
    private activeProjectService:ActiveProjectService,
    private util:UtilitiesService,
    public keyboard:KeyboardService
  ) {
      // wait for the project to be set
      this.activeProjectService.onProjectChange().subscribe(project => {
        this.activeProjectReady = true;
      })

      // trigger the activation of the project
      this.activeProjectService.setActiveProject(this.activatedRoute.snapshot.parent.params['id']);

      //get pkEntity from url
      this.pkEntity = this.activatedRoute.snapshot.params['id'];

  }

  ngOnInit() {

    //set the peItState
    this.peItState = 'edit';

  }

}


