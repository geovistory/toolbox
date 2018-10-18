import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClassConfig, IAppState, InfPersistentItem, PeItDetail, SubstoreComponent, U, InfPersistentItemApi } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { Observable, Subject } from 'rxjs';
import { CreateOrAddPeItAPIActions } from './api/create-or-add-pe-it.actions';
import { CreateOrAddPeItAPIEpics } from './api/create-or-add-pe-it.epics';
import { CreateOrAddPeIt } from './api/create-or-add-pe-it.models';
import { createOrAddPeItReducer } from './api/create-or-add-pe-it.reducer';
import { ClassAndTypePk } from '../class-and-type-selector/api/class-and-type-selector.models';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: createOrAddPeItReducer
})
@Component({
  selector: 'gv-create-or-add-pe-it',
  templateUrl: './create-or-add-pe-it.component.html',
  styleUrls: ['./create-or-add-pe-it.component.css']
})
export class CreateOrAddPeItComponent extends CreateOrAddPeItAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<CreateOrAddPeIt>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() createForm$: Observable<PeItDetail>;

  // class of the peIt to add or create
  @select() classAndTypePk$: Observable<ClassAndTypePk>;

  // emits the nested peIt, no matter if created, added or opened!
  @Output() done = new EventEmitter<InfPersistentItem>();

  // on cancel
  @Output() cancel = new EventEmitter<void>();


  searchString$ = new Subject<string>();

  classConfig: ClassConfig;

  @ViewChild('f') form: NgForm;

  constructor(
    protected rootEpics: RootEpics,
    private epics: CreateOrAddPeItAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private peItApi: InfPersistentItemApi
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, createOrAddPeItReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    const pkClass = this.localStore.getState().classAndTypePk.pkClass;

    if (!pkClass) {
      throw Error('please provide a pkClass.');
    }

    this.initCreateForm(pkClass, this.ngRedux.getState().activeProject.crm);

    this.classConfig = this.ngRedux.getState().activeProject.crm.classes[pkClass];

    this.form.valueChanges.takeUntil(this.destroy$).subscribe(val => {
      this.searchString$.next(U.stringForPeIt(val.peIt))
    })


  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onAddExisting(pkEntity: number) {
    this.peItApi.addToProject(this.ngRedux.getState().activeProject.pk_project, pkEntity).subscribe(
      (peIt) => { this.done.emit(peIt) }
    )
  }

  onOpenExisting(pkEntity: number) {
    this.peItApi.nestedObjectOfProject(this.ngRedux.getState().activeProject.pk_project, pkEntity).subscribe(
      (peIt) => { this.done.emit(peIt) }
    )
  }

  onCreateNew(peIt: InfPersistentItem) {
    this.peItApi.findOrCreatePeIt(this.ngRedux.getState().activeProject.pk_project, peIt).subscribe(
      (peIts) => { this.done.emit(peIts[0]) }
    )
  }

  submitCreateForm() {
    if (this.form.form.valid) {
      this.onCreateNew(this.form.form.value.peIt)
    }
  }

}
