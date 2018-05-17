import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
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
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@AutoUnsubscribe({
  includeArrays: true
})
@Component({
  selector: 'gv-entity-add-create-new',
  templateUrl: './entity-add-create-new.component.html',
  styleUrls: ['./entity-add-create-new.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EntityAddCreateNewComponent implements OnInit {

  readonly basePath = ['information', 'entityCreateNew']
  getBasePath = () => this.basePath
  localStore: ObservableStore<IEntityCreateNewState>;

  loading: boolean = false;
  errorMessages: any;

  formGroup: FormGroup;

  formCtrlName = 'persistent_item';

  subs: Subscription[] = [];

  constructor(
    private persistentItemApi: InfPersistentItemApi,
    private modalService: EntityAddModalService,
    private activeModal: NgbActiveModal,
    private slimLoadingBarService: SlimLoadingBarService,
    private ngRedux: NgRedux<IEntityCreateNewState>,
    private actions: EntityCreateNewActions,
    private stateCreator: StateCreatorService,
    private fb: FormBuilder,
    private ref: ChangeDetectorRef
  ) {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityCreateNewReducer);

    this.formGroup = this.fb.group({})
    // subscribe to the form
    this.subs.push(this.formGroup.valueChanges.subscribe(val=>{
      if(this.formGroup.valid){
        this.onPeItReadyToCreate(val[this.formCtrlName])
      }else{
        this.onPeItNotReadyToCreate();
      }

    }))
  }


  ngOnInit() {

    this.modalService.previousState = EntityAddModalState[1];

    this.modalService.modalTitle = "Create a new " + this.modalService.selectedClass.dfh_standard_label

    this.modalService.addButtonVisible = false;

    // Init the state
    const sub1 = this.stateCreator.initializePeItToCreate(this.modalService.selectedClass.dfh_pk_class, this.modalService.searchString).subscribe(peItState => {
      let wrapper = new EntityCreateNewState({
        peItState: peItState
      });

      this.localStore.dispatch(this.actions.entityCreateNewInitialized(wrapper));
    })
    this.subs.push(sub1)

    // wait for the peItState and activeProject to configure the form
    const sub2 = Observable.combineLatest(
      this.localStore.select<IPeItState>('peItState'),
      this.ngRedux.select<Project>('activeProject')
    ).subscribe(results => {
      const peItState = results[0], project = results[1];
      if (peItState) {

        this.formGroup.addControl(this.formCtrlName, new FormControl(
          peItState.peIt,
          [
            Validators.required
          ]
        ))

        this.ref.detectChanges();
      }


      //TEMP
      // let epr = new  InfEntityProjectRel;
      // epr.fk_project = project.pk_project;
      // StateToDataService.peItStateToPeItToRelate(peItState, epr)
    })

    this.subs.push(sub2)

    // this.peItState$.subscribe(d => this.modalService.peItStateToAdd = d)


  }

  ngOnDestroy() {
    this.ref.detach()
    this.subs.forEach(sub => { sub.unsubscribe() })

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
