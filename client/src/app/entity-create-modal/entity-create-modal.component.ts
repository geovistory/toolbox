import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PersistentItem } from '../shared/sdk/models/PersistentItem';
import { PersistentItemApi } from '../shared/sdk/services/custom/PersistentItem';

@Component({
  selector: 'gv-entity-create-modal',
  templateUrl: './entity-create-modal.component.html',
  styleUrls: ['./entity-create-modal.component.scss']
})
export class EntityCreateModalComponent implements OnInit {
  @Input() projectId;
  @Input() onAddNewPeIt;

  loading: boolean = false;
  errorMessages: any;
  model = new PersistentItem();

   constructor(
     private persistentItemApi: PersistentItemApi,
     public activeModal: NgbActiveModal
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

}
