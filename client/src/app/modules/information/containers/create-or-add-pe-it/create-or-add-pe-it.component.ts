import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClassConfig, IAppState, InfPersistentItem, PeItDetail, SubstoreComponent, U, InfPersistentItemApi, InfEntityAssociation } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { Observable, Subject, combineLatest } from 'rxjs';
import { CreateOrAddPeItAPIActions } from './api/create-or-add-pe-it.actions';
import { CreateOrAddPeItAPIEpics } from './api/create-or-add-pe-it.epics';
import { CreateOrAddPeIt } from './api/create-or-add-pe-it.models';
import { createOrAddPeItReducer } from './api/create-or-add-pe-it.reducer';
import { ClassAndTypePk } from '../class-and-type-selector/api/class-and-type-selector.models';
import * as Config from '../../../../../../../common/config/Config';
import { takeUntil, first } from 'rxjs/operators';

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
  @Input() selectPeItMode: boolean;

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() createForm$: Observable<PeItDetail>;

  // class of the peIt to add or create
  @select() classAndTypePk$: Observable<ClassAndTypePk>;
  @select() pkUiContext$: Observable<number>;

  // emits the nested peIt, no matter if created, added, opened or selected!
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


    combineLatest(this.classAndTypePk$, this.pkUiContext$).pipe(
      first((d) => d.filter((i) => (!i)).length === 0),
      takeUntil(this.destroy$)
    ).subscribe((d) => {

      const pkClass = d[0].pkClass;
      const pkType = d[0].pkType;
      const pkUiContext = d[1];
      const crm = this.ngRedux.getState().activeProject.crm;
      // if (!pkClass) throw Error('please provide a pkClass.');
      // if (!pkUiContext) throw Error('please provide a pkUiContext.');

      this.classConfig = crm.classes[pkClass];

      // create the entityAssociation for the type
      const domainEntityAssociations: InfEntityAssociation[] = [];
      if (pkType) {
        domainEntityAssociations.push({
          fk_domain_entity: undefined,
          fk_property: Config.PK_CLASS_PK_HAS_TYPE_MAP[pkClass],
          fk_range_entity: pkType
        } as InfEntityAssociation)
      }

      this.initCreateForm(pkClass, domainEntityAssociations, crm, pkUiContext);
    })


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
      (peIts) => { this.done.emit(peIts[0]) }
    )
  }

  onOpenExisting(pkEntity: number) {
    this.peItApi.nestedObjectOfProject(this.ngRedux.getState().activeProject.pk_project, pkEntity).subscribe(
      (peIts) => { this.done.emit(peIts[0]) }
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
