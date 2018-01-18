import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { PeItComponent , PeItStates } from '../pe-it/pe-it.component';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { PersistentItemVersion } from '../shared/sdk/models/PersistentItemVersion';
import { PersistentItemVersionApi } from '../shared/sdk/services/custom/PersistentItemVersion';
import { PropertyPipe } from '../shared/pipes/property';
import { Appellation } from '../shared/sdk/models/Appellation';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { EntityEditorState } from '../shared/classes/entity-editor-state.class';
import { ActivePeItService } from '../shared/services/active-pe-it.service';


@Component({
  selector: 'gv-pe-it-entity',
  templateUrl: './pe-it-entity.component.html',
  styleUrls: ['./pe-it-entity.component.scss']
})
export class PeItEntityComponent extends PeItComponent implements OnInit {

  /**
  * Inputs
  */

  // Note that there may be inherited inputs

  /**
  * Outputs
  */

  /**
  * Properties
  */

  // id representing the pk_entity of the peIt
  id:number;

  // id of the active project
  projectId:number;

  // Flag if some async process is running
  loading:boolean;

  // Persistent Item used by this component
  peIt:PersistentItemVersion;

  // Displayed standard name of this peIt
  standardName:string;

  //note that other properties may be inherited from super class


  constructor(
    private activeProjectService:ActiveProjectService,
    private activatedRoute: ActivatedRoute,
    private peItApi: PersistentItemVersionApi,
    private propertyPipe: PropertyPipe,
    private slimLoadingBarService: SlimLoadingBarService,
    private activePeItService:ActivePeItService
  ) {
    super();
  }


  /**
   * Methods
   */

  ngOnInit() {
    this.id = this.activatedRoute.snapshot.params['id'];

    this.projectId = this.activatedRoute.snapshot.parent.params['id'];

    // if no state provided on input, default to edit

    this.state = this.state ? this.state : PeItStates.edit;

    // if no peIt is aprovided on the comonent's input

    if(!this.peIt){

      // Query the peIt and set the peIt by a call to the Api

      this.setPeItFromApi();
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


  /**
  * setPeItFromApi - get a rich object of the PeIt with all its
  * roles > temporal entities > roles > PeIts from Api
  * and store it in the ActivePeItService.peIt
  *
  * @return {void}
  */
  setPeItFromApi(){
    this.startLoading();

    const innerJoinThisProject = {
      "entity_version_project_rels": {
        "$relation": {
          "name": "entity_version_project_rels",
          "joinType": "inner join",
          "where": ["fk_project", "=", this.projectId]
        }
      }
    };

    const filter =
    {
      "where": ["pk_entity","=",this.id],
      "include":{
        ...innerJoinThisProject,
        "pi_roles":{
          "$relation": {
            "name": "pi_roles",
            "joinType": "left join"
          },
          ...innerJoinThisProject,
          "temporal_entity": {
            "$relation": {
              "name": "temporal_entity",
              "joinType": "inner join",
              "orderBy":[{"pk_entity":"asc"}]
            },
            ...innerJoinThisProject,
            "te_roles": {
              "$relation": {
                "name": "te_roles",
                "joinType": "inner join",
                "orderBy":[{"pk_entity":"asc"}]
              },
              ...innerJoinThisProject,
              "appellation": {
                "$relation": {
                  "name": "appellation",
                  "joinType": "left join",
                  "orderBy":[{"pk_entity":"asc"}]
                },
                ...innerJoinThisProject
              },
              "language": {
                "$relation": {
                  "name": "language",
                  "joinType": "left join",
                  "orderBy":[{"pk_entity":"asc"}]
                }
                // ,
                // ...innerJoinThisProject
              }
            }
          }
        }
      }
    }

    this.peItApi.findComplex(filter).subscribe(
      (peIts: PersistentItemVersion[]) => {
        this.peIt = peIts[0];

        this.activePeItService.peIt = this.peIt;

        this.completeLoading();

      });
    }

    setStandardName(string){
      this.standardName = string;
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
