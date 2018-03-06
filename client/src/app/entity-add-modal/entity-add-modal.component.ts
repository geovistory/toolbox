import { Component, OnInit, OnDestroy, Input } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EntityAddModalService } from '../shared/services/entity-add-modal.service';

@Component({
  selector: 'gv-entity-add-modal',
  templateUrl: './entity-add-modal.component.html',
  styleUrls: ['./entity-add-modal.component.scss']
})
export class EntityAddModalComponent implements OnInit, OnDestroy {
  @Input() projectId;


  state: string;

  constructor(
    public activeModal: NgbActiveModal,
    public modalService: EntityAddModalService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this.modalService.onStateChange.subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {
    this.modalService.pkProject = this.projectId;
  }

  ngOnDestroy() {

    this.modalService.selectRoleRange = undefined;

    // true if add button should be visible
    this.modalService.addButtonVisible = undefined;

    // Class of the entity to add
    this.modalService.selectedClass = undefined;

    // Current modal title
    this.modalService.modalTitle = undefined;

    // Primary Key of the current project
    this.modalService.pkProject = undefined;

    // Primary Key of the persistent Item to Add
    this.modalService.pkEntity = undefined;

    // The persistent Item to Add
    this.modalService.peItToAdd = undefined;

    // The persistent item to create
    this.modalService.peItToCreate = undefined;

    // The search string used to search existing peIts
    // and create the appellation of the new peIt
    this.modalService.searchString = undefined;

    // true if create button should be visible
    this.modalService.createButtonVisible = undefined;

  }

  changeState(newState: string) {
    this.modalService.state = newState;
  }

  add() {
    this.startLoading();
    this.modalService.changePeItProjectRelation().subscribe(success => {
      this.modalService.onOpen.emit(this.modalService.pkEntity);
      this.completeLoading();
      this.activeModal.close('Entity Added');
    });
  }

  create() {
    this.startLoading();
    this.modalService.createPeIt().subscribe(peIts => {
      const peIt = peIts[0];
      this.modalService.onOpen.emit(peIt.pk_entity);
      this.completeLoading();
      this.activeModal.close('Entity Created');
    });
  }

  createAndSelect() {
    this.startLoading();
    this.modalService.createPeIt().subscribe(peIts => {
      const peIt = peIts[0];
      this.modalService.onSelect.emit(peIt.pk_entity);
      this.completeLoading();
      this.activeModal.close('Entity Created');
    });
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
