import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { EntityAddModalService } from '../shared/services/entity-add-modal.service';
import { PersistentItemVersionApi } from '../shared/sdk/services/custom/PersistentItemVersion';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InformationRole } from '../shared/sdk/models/InformationRole';
import { PersistentItemVersion } from '../shared/sdk/models/PersistentItemVersion';

@Component({
  selector: 'gv-entity-add-add-existing',
  templateUrl: './entity-add-add-existing.component.html',
  styleUrls: ['./entity-add-add-existing.component.scss']
})
export class EntityAddAddExistingComponent implements OnInit {
  loading;

  persistentItemVersion:PersistentItemVersion;

  names:Array<InformationRole>=[]

  standardName:string;

  constructor(
    private persistentItemApi: PersistentItemVersionApi,
    private modalService:EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.queryPersistentItem()
  }

  queryPersistentItem(){
    const filter =
    {
      /** Select persistent item by pk_entity … */
      "where": ["pk_entity", "=", this.modalService.pkEntity, "and", "is_community_favorite", "=", "true"],
      "orderBy":[{"pk_entity":"asc"}],
      "include": {

        /** include all roles … */
        "pi_roles": {
          "$relation": {
            "name": "pi_roles",
            "joinType": "left join",
          //  "where": ["is_community_favorite", "=", "true"],
            "orderBy":[{"pk_entity":"asc"}]
          },
          "entity_version_project_rels": {
            "$relation": {
              "name": "entity_version_project_rels",
              "joinType": "left join"
            //  "where": ["is_community_favorite", "=", "true"],
            }
          },

          /** include the temporal_entity of the role */
          "temporal_entity":{
            "$relation": {
              "name": "temporal_entity",
              "joinType": "inner join",
            //  "where": ["is_community_favorite", "=", "true"],
              "orderBy":[{"pk_entity":"asc"}]
            },
            "te_roles": {
              "$relation": {
                "name": "te_roles",
                "joinType": "left join",
                "orderBy":[{"pk_entity":"asc"}]
              },
              "language": {
                "$relation": {
                  "name": "language",
                  "joinType": "left join",
                  //"where": ["is_community_favorite", "=", "true"],
                  "orderBy":[{"pk_entity":"asc"}]
                }
                //,...innerJoinThisProject, // … get project's version

              },
              "appellation": {
                "$relation": {
                  "name": "appellation",
                  "joinType": "left join",
                //  "where": ["is_community_favorite", "=", "true"],
                  "orderBy":[{"pk_entity":"asc"}]
                }
              }
              //,...innerJoinThisProject, // … get project's version

            }
          }
        }
      }
    }

    this.startLoading();
    this.persistentItemApi.findComplex(
      filter
    ).subscribe(
      (persistentItems: PersistentItemVersion[]) => {

        this.modalService.persistentItemVersion = this.persistentItemVersion = persistentItems[0];

        this.setNames(this.persistentItemVersion);

        this.loading = false;

        this.completeLoading();
      });
    }

    setNames(persistentItem:PersistentItemVersion){
      this.names = this.persistentItemVersion.pi_roles
      .filter(role => role.fk_property === 'R63');
    }

    setStandardName(string){
      this.standardName = string;
      this.modalService.modalTitle =
      'Add ' + this.modalService.selectedClass.label + ' '
      + this.standardName + ' to your Project';
    }

    setEprNaming(eprNaming){
      this.modalService.eprNaming = eprNaming;
    }

    /**
    * Loading Bar Logic
    */

    startLoading() {
      this.slimLoadingBarService.progress = 20;
      this.slimLoadingBarService.start(() => {
      });
    }

    stopLoading() {
      this.slimLoadingBarService.stop();
    }

    completeLoading() {
      this.slimLoadingBarService.complete();
    }

    resetLoading() {
      this.slimLoadingBarService.reset();
    }
  }



