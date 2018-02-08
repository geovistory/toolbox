import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityAddModalService } from '../shared/services/entity-add-modal.service';
import { PersistentItemVersion } from '../shared/sdk/models/PersistentItemVersion';
import { PersistentItemVersionApi } from '../shared/sdk/services/custom/PersistentItemVersion';
import { ActiveProjectService } from '../shared/services/active-project.service';
import { KeyboardService } from '../shared/services/keyboard.service';

@Component({
  selector: 'gv-entity-add-create-new',
  templateUrl: './entity-add-create-new.component.html',
  styleUrls: ['./entity-add-create-new.component.scss']
})
export class EntityAddCreateNewComponent implements OnInit {

  @Input() onAddNewPeIt;
  @Input() projectId;

  peItToCreate: PersistentItemVersion;
  loading: boolean = false;
  errorMessages: any;

  isReadyToCreate: boolean;

  constructor(
    private keyboard: KeyboardService,
    private activeProjectService: ActiveProjectService,
    private persistentItemApi: PersistentItemVersionApi,
    public activeModal: NgbActiveModal,
    public modalService: EntityAddModalService
  ) { }

  ngOnInit() {
    this.modalService.modalTitle = "Create a new " + this.modalService.selectedClass.label
  }

  setEntityModalState(newState: string) {
    this.modalService.state = newState;
  }

  onPeItReadyToCreate(peIt: PersistentItemVersion) {
    this.peItToCreate = peIt;
    this.isReadyToCreate = true;
  }

  onPeItNotReadyToCreate() {
    this.isReadyToCreate = false;
  }

  createPeIt() {
    //TODO loading bar
    this.persistentItemApi.findOrCreatePeIt(
      this.activeProjectService.project.pk_project,
      this.peItToCreate
    ).subscribe(peIts => {
      //TODO loading bar
      //TODO Close and so on
    })
  }


}
