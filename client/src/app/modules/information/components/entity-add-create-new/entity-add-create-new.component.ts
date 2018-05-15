import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { EntityAddModalComponent } from '../entity-add-modal/entity-add-modal.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { InfPersistentItem, EntityEditorService, InfPersistentItemApi, Project, InfEntityProjectRel } from 'app/core';
import { EntityAddModalState, EntityAddModalService } from '../../shared/entity-add-modal.service';
import { IEntityCreateNewState, EntityCreateNewState } from './entity-add-create-new.model';
import { ObservableStore, select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable';
import { IPeItState, PeItState } from '../../containers/pe-it/pe-it.model';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { EntityCreateNewActions } from './entity-add-create-new.actions';
import { StateCreatorService } from '../../shared/state-creator.service';
import { StateToDataService } from '../../shared/state-to-data.service';
import { entityCreateNewReducer } from './entity-add-create-new.reducer';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'gv-entity-add-create-new',
  templateUrl: './entity-add-create-new.component.html',
  styleUrls: ['./entity-add-create-new.component.scss']
})
export class EntityAddCreateNewComponent implements OnInit {

  readonly basePath = ['information', 'entityCreateNew']
  getBasePath = () => this.basePath
  localStore: ObservableStore<IEntityCreateNewState>;


  @select() peItState$: Observable<IPeItState>;

  peItToCreate: InfPersistentItem;
  loading: boolean = false;
  errorMessages: any;

  isReadyToCreate: boolean;

  pkEntity: number;

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    private modalService: EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IEntityCreateNewState>,
    private actions: EntityCreateNewActions,
    private stateCreator: StateCreatorService
  ) {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityCreateNewReducer);

  }

  ngOnInit() {

    this.modalService.previousState = EntityAddModalState[1];

    this.modalService.modalTitle = "Create a new " + this.modalService.selectedClass.dfh_standard_label


    this.ngRedux.select<Project>('activeProject').subscribe(project => {
      this.stateCreator.initializePeItToCreate(this.modalService.selectedClass.dfh_pk_class).subscribe(peItState => {
        let wrapper = new EntityCreateNewState({
          peItState: peItState
        });

        this.localStore.dispatch(this.actions.entityCreateNewInitialized(wrapper));

        this.modalService.addButtonVisible = true;

        //TEMP
        // let epr = new  InfEntityProjectRel;
        // epr.fk_project = project.pk_project;
        // StateToDataService.peItStateToPeItToRelate(peItState, epr)

        this.peItState$.subscribe(d => this.modalService.peItStateToAdd = d)
      })
    })


  }

  ngOnDestroy() {
    this.localStore.dispatch(this.actions.entityCreateNewDestroyed())
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
