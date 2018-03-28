import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { InfPersistentItemApi, InfPersistentItem } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityAddModalService, EntityAddModalState } from '../../shared/entity-add-modal.service';



@Component({
  selector: 'gv-entity-add-add-existing',
  templateUrl: './entity-add-add-existing.component.html',
  styleUrls: ['./entity-add-add-existing.component.scss']
})
export class EntityAddAddExistingComponent implements OnInit {
  loading;

  pkEntity: number;

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    private modalService: EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService
  ) { }

  ngOnInit() {
    this.pkEntity = this.modalService.pkEntity;
    this.modalService.previousState = EntityAddModalState[1];
  }


  onPeItReadyToAdd(peIt: InfPersistentItem) {
    this.modalService.peItToAdd = peIt;
    this.modalService.addButtonVisible = true;
  }

  onPeItNotReadyToAdd(){
    this.modalService.peItToAdd = undefined;
    this.modalService.addButtonVisible = false;
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



