import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityAddModalService , EntityAddModalState } from '../shared/services/entity-add-modal.service';
import { InfPersistentItem } from '../shared/sdk/models/InfPersistentItem';
import { KeyboardService } from '../shared/services/keyboard.service';

@Component({
  selector: 'gv-entity-add-create-new',
  templateUrl: './entity-add-create-new.component.html',
  styleUrls: ['./entity-add-create-new.component.scss']
})
export class EntityAddCreateNewComponent implements OnInit {

  @Input() onAddNewPeIt;
  @Input() projectId;

  peItToCreate: InfPersistentItem;
  loading: boolean = false;
  errorMessages: any;

  isReadyToCreate: boolean;

  constructor(
    public keyboard: KeyboardService,
    public activeModal: NgbActiveModal,
    public modalService: EntityAddModalService
  ) { }

  ngOnInit() {

    this.modalService.previousState = EntityAddModalState[1];

    this.modalService.modalTitle = "Create a new " + this.modalService.selectedClass.label
  }

  setEntityModalState(newState: string) {
    this.modalService.state = newState;
  }

  onPeItReadyToCreate(peIt: InfPersistentItem) {
    this.modalService.peItToCreate = peIt;
    this.modalService.createButtonVisible = true;
  }

  onPeItNotReadyToCreate() {
    this.modalService.peItToCreate = undefined;
    this.modalService.createButtonVisible = false;
  }


}
