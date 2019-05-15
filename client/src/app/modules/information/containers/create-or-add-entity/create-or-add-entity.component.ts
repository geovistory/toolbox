import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClassConfig, IAppState, InfEntityAssociation, InfPersistentItem, InfPersistentItemApi, InfTemporalEntity, InfTemporalEntityApi, PeItDetail, SubstoreComponent, TeEntDetail, U } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import * as Config from '../../../../../../../common/config/Config';
import { ClassAndTypePk } from '../class-and-type-selector/api/class-and-type-selector.models';
import { CreateOrAddEntityAPIActions } from './api/create-or-add-entity.actions';
import { CreateOrAddEntityAPIEpics } from './api/create-or-add-entity.epics';
import { CreateOrAddEntity } from './api/create-or-add-entity.models';
import { createOrAddEntityReducer } from './api/create-or-add-entity.reducer';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: createOrAddEntityReducer
})
@Component({
  selector: 'gv-create-or-add-entity',
  templateUrl: './create-or-add-entity.component.html',
  styleUrls: ['./create-or-add-entity.component.css']
})
export class CreateOrAddEntityComponent extends CreateOrAddEntityAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<CreateOrAddEntity>;

  // path to the substore
  @Input() basePath: string[];
  @Input() selectPeItMode: boolean;

  // select observables of substore properties
  @select() loading$: Observable<boolean>;
  @select() createPeItForm$: Observable<PeItDetail>;
  @select() createTeEnForm$: Observable<TeEntDetail>;

  // class of the peIt to add or create
  @select() classAndTypePk$: Observable<ClassAndTypePk>;
  @select() pkUiContext$: Observable<number>;
  @select() pkNamespace$: Observable<number>;

  // emits the nested PeIt or TeEn, no matter if created, added, opened or selected!
  @Output() done = new EventEmitter<InfPersistentItem | InfTemporalEntity>();

  // on cancel
  @Output() cancel = new EventEmitter<void>();

  peIt: InfPersistentItem;
  teEn: InfTemporalEntity;


  searchString$ = new Subject<string>();

  classConfig: ClassConfig;


  @ViewChild('f') form: NgForm;

  constructor(
    protected rootEpics: RootEpics,
    private epics: CreateOrAddEntityAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private peItApi: InfPersistentItemApi,
    private teEnApi: InfTemporalEntityApi
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, createOrAddEntityReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));


    combineLatest(this.classAndTypePk$, this.pkUiContext$).pipe(
      first((d) => {
        return ((d[0] && d[1]) ? true : false)
      }),
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
          fk_info_domain: undefined,
          fk_property: Config.PK_CLASS_PK_HAS_TYPE_MAP[pkClass],
          fk_info_range: pkType
        } as InfEntityAssociation)
      }

      this.initCreateForm(pkClass, domainEntityAssociations, crm, pkUiContext);

    })

  }

  /**
   * gets called by create peIt control, also when the form is not valid.
   * May contain invalid peIt, that allows to retrieve some string
   * to search for existing peIts
   * @param peIt
   */
  onValueChange(peIt: InfPersistentItem) {
    this.searchString$.next(U.stringForPeIt(peIt))
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

  submitCreateForm() {
    // Create PeIt
    if (this.form.form.valid && this.form.form.value.peIt) {
      this.peItApi.findOrCreatePeIt(this.ngRedux.getState().activeProject.pk_project, this.form.form.value.peIt).subscribe(
        (peIts) => { this.done.emit(peIts[0]) }
      )
    }

    // Find or create TeEn
    if (this.form.form.valid && this.form.form.value.teEn) {
      this.teEnApi.findOrCreateInfTemporalEntity(this.ngRedux.getState().activeProject.pk_project, this.form.form.value.teEn.temporal_entity).subscribe(
        (teEns) => { this.done.emit(teEns[0]) }
      )
    }
  }

}
