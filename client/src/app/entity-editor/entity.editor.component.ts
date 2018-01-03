import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { PersistentItemVersion } from '../shared/sdk/models/PersistentItemVersion';
import { PersistentItemVersionApi } from '../shared/sdk/services/custom/PersistentItemVersion';
import { PropertyPipe } from '../shared/pipes/property';
import { Appellation } from '../shared/sdk/models/Appellation';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { TemporalEntity } from '../shared/sdk/models/TemporalEntity';
import { EntityEditorState } from '../shared/classes/entity-editor-state.class';


@Component({
  selector: 'gv-entity-editor',
  templateUrl: './entity.editor.component.html',
  styleUrls: ['./entity.editor.component.scss']
})
export class EntityEditorComponent implements OnInit {

  id; // id from url parameter id, representing the pk_persistent_item
  projectId;
  loading;

  persistentItemVersion:PersistentItemVersion;

  names:Array<InformationRole>=[]

  standardName:string;

  entityEditorState = new EntityEditorState();

  private _communityDataView:boolean;

  set communityDataView(bool:boolean){
    this._communityDataView = bool;
    if(this._communityDataView === true){
      this.entityEditorState.state = 'communityDataView';
    }
    else if (this.communityDataView === false){
      this.entityEditorState.state = 'edit';
    }
  }

  get communityDataView():boolean{
    return this._communityDataView;
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private persistentItemVersionApi: PersistentItemVersionApi,
    private propertyPipe: PropertyPipe,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
  }

  ngOnInit() {

    this.id = this.activatedRoute.snapshot.params['id'];

    this.projectId = this.activatedRoute.snapshot.parent.params['id'];

    this.communityDataView = false;

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


    this.persistentItemVersionApi.findComplex(filter).subscribe(
      (persistentItemVersions: PersistentItemVersion[]) => {
        this.persistentItemVersion = persistentItemVersions[0];

        this.setNames(this.persistentItemVersion);

        this.completeLoading();

      });
    }

    setNames(persistentItemVersion:PersistentItemVersion){
      this.names = this.persistentItemVersion.pi_roles.filter(role => role.fk_property === 'R63');
    }

    setStandardName(string){
      this.standardName = string;
    }

    toggleCommunityDataView(){
      this.completeLoading();
      this.communityDataView = !this.communityDataView;
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


