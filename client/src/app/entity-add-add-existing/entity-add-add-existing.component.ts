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

  pkEntity:number;

  constructor(
    private persistentItemApi: PersistentItemVersionApi,
    private modalService:EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.pkEntity = this.modalService.pkEntity;
    // this.queryPersistentItem()
  }

  // queryPersistentItem(){


    // this.startLoading();
    // this.persistentItemApi.nestedObjectOfRepo(this.modalService.pkEntity).subscribe(
    //   (persistentItems: PersistentItemVersion[]) => {
    //
    //     this.modalService.persistentItemVersion = this.persistentItemVersion = persistentItems[0];
    //
    //     // this.setNames(this.persistentItemVersion);
    //
    //     this.loading = false;
    //
    //     this.completeLoading();
    //   });
    // }

    // setNames(persistentItem:PersistentItemVersion){
    //   this.names = this.persistentItemVersion.pi_roles
    //   .filter(role => role.fk_property === 'R63');
    // }
    //
    // setStandardName(string){
    //   this.standardName = string;
    //   this.modalService.modalTitle =
    //   'Add ' + this.modalService.selectedClass.label + ' '
    //   + this.standardName + ' to your Project';
    // }
    //
    // setEprNaming(eprNaming){
    //   this.modalService.eprNaming = eprNaming;
    // }

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



