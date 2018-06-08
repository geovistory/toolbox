import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAppState, InfEntityProjectRel, InfPersistentItemApi, Project } from 'app/core';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { Observable } from 'rxjs/Observable';

import { Information, PeItDetail } from '../../information.models';
import { EntityAddModalService, EntityAddModalState } from '../../shared/entity-add-modal.service';
import { StateCreatorService } from '../../shared/state-creator.service';
import { EntityAddExistingActions } from './entity-add-add-existing.actions';
import { entityAddExistingReducer } from './entity-add-add-existing.reducer';


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
    private actions: EntityAddExistingActions,
    private stateCreator: StateCreatorService
  ) {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityAddExistingReducer);

  }

  ngOnInit() {
    this.pkEntity = this.modalService.pkEntity;
    this.modalService.previousState = EntityAddModalState[1];


    this.ngRedux.select<Project>('activeProject').subscribe(project => {
      this.stateCreator.initializePeItState(this.pkEntity, project.pk_project).subscribe(peItDetail => {

        this.localStore.dispatch(this.actions.entityAddExistingInitialized({
          _peIt_add_form: peItDetail
        } as Information));

        this.modalService.addButtonVisible = true;

        //TEMP
        let epr = new  InfEntityProjectRel;
        epr.fk_project = project.pk_project;
        this._peIt_add_form$.subscribe(d => {
          this.modalService.peItToAdd = d.form.peIt
        })
      })
    })

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



