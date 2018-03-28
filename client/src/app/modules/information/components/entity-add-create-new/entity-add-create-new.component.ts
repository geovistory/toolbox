import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItem, EntityEditorService } from 'app/core';
import { EntityAddModalState, EntityAddModalService } from '../../shared/entity-add-modal.service';

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
    public entityEditor: EntityEditorService,
    public activeModal: NgbActiveModal,
    public modalService: EntityAddModalService
  ) { }

  ngOnInit() {

    this.modalService.previousState = EntityAddModalState[1];

    this.modalService.modalTitle = "Create a new " + this.modalService.selectedClass.dfh_standard_label
  }

  setEntityModalState(newState: string) {
    this.modalService.state = newState;
  }

  onPeItReadyToCreate(peIt: InfPersistentItem) {
    this.modalService.peItToCreate = new InfPersistentItem(peIt);
    this.modalService.peItToCreate.fk_class = this.modalService.selectedClass.dfh_pk_class;
    this.modalService.createButtonVisible = true;
  }

  onPeItNotReadyToCreate() {
    this.modalService.peItToCreate = undefined;
    this.modalService.createButtonVisible = false;
  }


}
