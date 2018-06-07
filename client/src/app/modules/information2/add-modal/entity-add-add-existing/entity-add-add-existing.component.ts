import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfEntityProjectRel, InfPersistentItemApi, Project } from 'app/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/Observable';

import { EntityAddModalService, EntityAddModalState } from '../../shared/entity-add-modal.service';
import { StateCreatorService } from '../../shared/state-creator.service';
import { StateToDataService } from '../../shared/state-to-data.service';
import { EntityAddExistingActions } from './entity-add-add-existing.actions';
import { EntityAddExistingState, IEntityAddExistingState } from './entity-add-add-existing.model';
import { entityAddExistingReducer } from './entity-add-add-existing.reducer';
import { PeItDetail } from '../../information.models';


@WithSubStore({
  localReducer: entityAddExistingReducer,
  basePathMethodName: 'getBasePath'
})
@Component({
  selector: 'gv-entity-add-add-existing',
  templateUrl: './entity-add-add-existing.component.html',
  styleUrls: ['./entity-add-add-existing.component.scss']
})
export class EntityAddAddExistingComponent implements OnInit {

  readonly basePath = ['information', 'entityAddExisiting']
  getBasePath = () => this.basePath
  localStore: ObservableStore<IEntityAddExistingState>;


  @select() peItState$: Observable<PeItDetail>;

  loading;

  pkEntity: number;

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    private modalService: EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IEntityAddExistingState>,
    private actions: EntityAddExistingActions,
    private stateCreator:StateCreatorService
  ) {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityAddExistingReducer);

  }

  ngOnInit() {
    this.pkEntity = this.modalService.pkEntity;
    this.modalService.previousState = EntityAddModalState[1];


    this.ngRedux.select<Project>('activeProject').subscribe(project => {
        this.stateCreator.initializePeItState(this.pkEntity, project.pk_project).subscribe(peItState => {
          let wrapper = new EntityAddExistingState({
            peItState: peItState
          });

          this.localStore.dispatch(this.actions.entityAddExistingInitialized(wrapper));

          this.modalService.addButtonVisible = true;

          //TEMP
          let epr= new InfEntityProjectRel;
          epr.fk_project = project.pk_project;
          this.peItState$.subscribe(d=> this.modalService.peItStateToAdd = d)
        })
    })

  }
  
  ngOnDestroy(){
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



