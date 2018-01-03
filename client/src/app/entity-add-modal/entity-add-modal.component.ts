import { Component, OnInit, Input } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { EntityAddModalService } from '../shared/services/entity-add-modal.service';

@Component({
  selector: 'gv-entity-add-modal',
  templateUrl: './entity-add-modal.component.html',
  styleUrls: ['./entity-add-modal.component.scss']
})
export class EntityAddModalComponent implements OnInit {
  @Input() projectId;


  state:string;

  constructor(
    public activeModal: NgbActiveModal,
    public modalService:EntityAddModalService,
    private slimLoadingBarService: SlimLoadingBarService
  ) {
    this.modalService.onStateChange.subscribe(state => {
      this.state = state;
    });
  }

  ngOnInit() {
    this.modalService.state = 'choose-class';
    this.modalService.pkProject = this.projectId;
  }

  changeState(newState:string){
    this.modalService.state = newState;
  }

  add(){
    this.startLoading();
    this.modalService.addPeItToProject().subscribe(success => {
      this.modalService.onOpen.emit(this.modalService.pkEntity);
      this.completeLoading();
      this.activeModal.close('Entity Added');
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
