import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {  EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { PersistentItemApi } from '../shared/sdk/services/custom/PersistentItem';
import { EntityAddModalService } from '../shared/services/entity-add-modal.service';

@Component({
  selector: 'gv-entity-add-create-new',
  templateUrl: './entity-add-create-new.component.html',
  styleUrls: ['./entity-add-create-new.component.scss']
})
export class EntityAddCreateNewComponent implements OnInit {

  @Input() onAddNewPeIt;
  @Input() projectId;

  model = new PersistentItem();
  loading: boolean = false;
  errorMessages: any;

    constructor(
      private persistentItemApi: PersistentItemApi,
      public activeModal: NgbActiveModal,
      private modalService:EntityAddModalService
    ) {}

    ngOnInit() {
    }



    createPeIt() {
      this.loading = true;
      this.errorMessages = {};
      this.persistentItemApi.createItem(this.projectId, this.model)
      .subscribe(
        data => {
          this.onAddNewPeIt.emit();
          this.activeModal.close('Close click');
          this.loading = false;
        },
        error => {
          // TODO: Alert
          this.errorMessages = error.error.details.messages;
          this.loading = false;
        }
      );
    }



  setEntityModalState(newState:string){
    this.modalService.state = newState;
  }

}
