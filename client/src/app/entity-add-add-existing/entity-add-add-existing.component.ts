import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { EntityAddModalService } from '../shared/services/entity-add-modal.service';
import { PersistentItemApi } from '../shared/sdk/services/custom/PersistentItem';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { InformationRole } from '../shared/sdk/models/InformationRole';

@Component({
  selector: 'gv-entity-add-add-existing',
  templateUrl: './entity-add-add-existing.component.html',
  styleUrls: ['./entity-add-add-existing.component.scss']
})
export class EntityAddAddExistingComponent implements OnInit {
  loading;

  persistentItem:PersistentItem;

  names:Array<InformationRole>=[]

  standardName:string;

  constructor(
    private persistentItemApi: PersistentItemApi,
    private modalService:EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.queryPersistentItem()
  }

  queryPersistentItem(){
    const filter = {
      "include": {
        "relation": "roles",
        "scope": {
          "include": [
            {
              "relation": "temporal_entity",
              "scope": {
                "include": {
                  "relation": "roles",
                  "scope": {
                    "include": ["language", "appellation"]
                  }
                }
              }
            },
            {
              "relation": "entity_project_rels"
              // ,
              // "where": {
              //   "fk_project": this.projectId
              // }
            }
          ]
        }
      }
    }

    this.startLoading();
    this.persistentItemApi.findById(
      this.modalService.pkPersistentItem,
      filter
    ).subscribe(
      (persistentItem: PersistentItem) => {

        this.modalService.persistentItem = this.persistentItem = persistentItem;

        this.setNames(this.persistentItem);

        this.loading = false;

        this.completeLoading();
      });
    }

    setNames(persistentItem:PersistentItem){
      this.names = this.persistentItem.roles
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



