import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';

import { EntityAddModalService, EntityAddModalState } from '../shared/services/entity-add-modal.service';
import { PersistentItemApi } from '../shared/sdk/services/custom/PersistentItem';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfRole } from '../shared/sdk/models/InfRole';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';

@Component({
  selector: 'gv-entity-add-add-existing',
  templateUrl: './entity-add-add-existing.component.html',
  styleUrls: ['./entity-add-add-existing.component.scss']
})
export class EntityAddAddExistingComponent implements OnInit {
  loading;

  pkEntity: number;

  constructor(
    private persistentItemApi: PersistentItemApi,
    private modalService: EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.pkEntity = this.modalService.pkEntity;
    this.modalService.previousState = EntityAddModalState[1];
  }


  onPeItReadyToAdd(peIt: PersistentItem) {
    this.modalService.peItToAdd = peIt;
    this.modalService.addButtonVisible = true;
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



