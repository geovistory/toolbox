import { Component, OnInit } from '@angular/core';

import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { InfPersistentItemApi, InfPersistentItem, Project, InfEntityProjectRel } from 'app/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EntityAddModalService, EntityAddModalState } from '../../shared/entity-add-modal.service';
import { IEntityAddExistingState, EntityAddExistingState } from './entity-add-add-existing.model';
import { ObservableStore, NgRedux, WithSubStore, select } from '@angular-redux/store';
import { EntityAddExistingActions } from './entity-add-add-existing.actions';
import { entityAddExistingReducer } from './entity-add-add-existing.reducer';
import { StateCreatorService } from '../../shared/state-creator.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { StateToDataService } from '../../shared/state-to-data.service';
import { IPeItState } from '../../containers/pe-it/pe-it.model';
import { Observable } from 'rxjs/Observable';


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


  @select() peItState$: Observable<IPeItState>;

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
        this.stateCreator.initializePeItState(this.pkEntity, project.pk_project, 'add-pe-it').subscribe(peItState => {
          let wrapper = new EntityAddExistingState({
            peItState: peItState
          });

          this.localStore.dispatch(this.actions.entityAddExistingInitialized(wrapper));

          this.modalService.addButtonVisible = true;

          //TEMP
          let epr= new InfEntityProjectRel;
          epr.fk_project = project.pk_project;
          StateToDataService.peItStateToPeItToRelate(peItState, epr)

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



