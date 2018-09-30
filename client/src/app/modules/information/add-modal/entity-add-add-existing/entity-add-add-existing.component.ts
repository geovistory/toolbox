import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IAppState } from 'app/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs';

import { PeItDetail } from 'app/core/state/models';
import { informationReducer } from '../../information.reducer';
import { EntityAddModalService, EntityAddModalState } from '../../shared/entity-add-modal.service';
import { StateCreatorService } from '../../shared/state-creator.service';
import { InformationActions } from '../../information.actions';
import { Information } from '../../information.models';


@WithSubStore({
  localReducer: informationReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-entity-add-add-existing',
  templateUrl: './entity-add-add-existing.component.html',
  styleUrls: ['./entity-add-add-existing.component.scss']
})
export class EntityAddAddExistingComponent implements OnInit {

  readonly basePath = ['information']
  getBasePath = () => this.basePath
  localStore: ObservableStore<Information>;


  @select() _peIt_add_form$: Observable<PeItDetail>;

  loading;

  pkEntity: number;

  constructor(
    private modalService: EntityAddModalService,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IAppState>,
    private actions: InformationActions,
    private stateCreator: StateCreatorService
  ) {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);

  }

  ngOnInit() {
    this.pkEntity = this.modalService.pkEntity;
    this.modalService.previousState = EntityAddModalState[1];


    this.stateCreator.initializePeItState(
      this.pkEntity,
      this.ngRedux.getState().activeProject.pk_project,
      { isAddMode: true }
    ).subscribe(peItDetail => {

      this.localStore.dispatch(this.actions.entityAddExistingInitialized(peItDetail));

    })

  }

  formChange(form: NgForm) {
    this.modalService.addButtonVisible = form.valid;
    this.modalService.peItToAdd = form.value.peIt;
  }

  ngOnDestroy() {
    this.localStore.dispatch(this.actions.entityAddExistingDestroyed())
  }


  // onPeItReadyToAdd(peIt: InfPersistentItem) {
  //   this.modalService.peItToAdd = peIt;
  //   this.modalService.addButtonVisible = true;
  // }

  // onPeItNotReadyToAdd() {
  //   this.modalService.peItToAdd = undefined;
  //   this.modalService.addButtonVisible = false;
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



