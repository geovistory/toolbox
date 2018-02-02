import { Component, OnInit, Input } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { PeItComponent , PeItStates } from '../pe-it/pe-it.component';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { PersistentItemVersion } from '../shared/sdk/models/PersistentItemVersion';
import { PropertyPipe } from '../shared/pipes/property';
import { Appellation } from '../shared/sdk/models/Appellation';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { EntityEditorState } from '../shared/classes/entity-editor-state.class';
import { ActivePeItService } from '../shared/services/active-pe-it.service';
import { PeItService } from '../shared/services/pe-it.service'
import { Property } from '../shared/services/property.service';
import { ClassService } from '../shared/services/class.service';
import { KeyboardService } from '../shared/services/keyboard.service';

@Component({
  selector: 'gv-pe-it-entity',
  templateUrl: './pe-it-entity.component.html',
  styleUrls: ['./pe-it-entity.component.scss']
})
export class PeItEntityComponent implements OnInit {

  /**
  * Inputs
  */

  // Primary key of the peIt
  @Input() pkEntity:number;

  // State of this component
  @Input() peItEntityState:string;

  /**
  * Outputs
  */

  /**
  * Properties
  */

  // id of the active project
  pkProject:number;

  // Flag if some async process is running
  loading:boolean;

  // Persistent Item used by this component
  peIt:PersistentItemVersion;

  // Displayed standard name of this peIt
  standardName:string;

  // array of properies of which the class of this peIt is range.
  outgoingProperties:Property[];

  // array of properies of which the class of this peIt is domain.
  ingoingProperties:Property[];

  //
  loadingProperties:boolean

  //this components
  thisComponent = this;

  constructor(
    private peItService: PeItService,
    private activeProjectService:ActiveProjectService,
    private propertyPipe: PropertyPipe,
    private activePeItService:ActivePeItService,
    private slimLoadingBarService: SlimLoadingBarService,
    private classService: ClassService,
    public keyboard:KeyboardService
  ) {
  }


  /**
  * Methods
  */

  ngOnInit() {

    this.pkProject = this.activeProjectService.project.pk_project;

    // if no state provided on input, default to edit

    this.peItEntityState = this.peItEntityState ? this.peItEntityState : PeItStates.edit;

    // if it is not create state

    if(["preview", "edit", "viewCommunity"].indexOf(this.peItEntityState) !== -1 ){

      // Query the peIt and set the peIt by a call to the Api
      this.queryRichObject()

    }
    else if(this.peItEntityState == "create"){

      //TODO

    }



  }


  /**
  * refreshPreview - Refreshes the preview info like the title of the currently
  *  edited PeIt (e.g. the standard appellation). This will be called by one of
  *  the edit components Naming or AddInfo.
  *
  * @return {void}
  */
  refreshPreview(){
    //TODO
    // use ActivePeItService.getStandardAppellationLabelOfProject
  }

  setStandardName(string){
    this.standardName = string;
  }


  queryRichObject(){
    this.startLoading();

    this.peItService.getRichObject(this.pkProject, this.pkEntity).subscribe(
      (peIts: PersistentItemVersion[]) => {

        this.peIt = peIts[0];

        this.activePeItService.peIt = this.peIt;

        // initialize the ingoing Properties

        this.ingoingProperties = this.classService
        .getIngoingProperties(this.peIt.fk_class);

        // initialize the outgoing Properties
        this.outgoingProperties = this.classService
        .getOutgoingProperties(this.peIt.fk_class);


        this.completeLoading();

      });

    }

    /**
    * Loading Bar Logic
    */

    startLoading() {
      this.loading = true;
      this.slimLoadingBarService.progress = 20;
      this.slimLoadingBarService.start(() => {
      });
    }

    stopLoading() {
      this.slimLoadingBarService.stop();
    }

    completeLoading() {
      this.loading = false;
      this.slimLoadingBarService.complete();
    }

    resetLoading() {
      this.slimLoadingBarService.reset();
    }



  }
