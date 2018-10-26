import { Component, OnDestroy, Input, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, InfPersistentItem, InfEntityAssociation, ClassConfig, InfEntityAssociationApi, ProjectCrm, RoleSet } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { entityAssociationReducer } from '../api/entity-association.reducer';
import { EntityAssociationAPIActions } from '../api/entity-association.actions';
import { EntityAssociationAPIEpics } from '../api/entity-association.epics';
import { EntityAssociationDetail } from 'app/core/state/models/entity-association-detail';
import { NgForm } from '@angular/forms';
import { filter, takeUntil, first } from 'rxjs/operators';
import { EntityAssociationList } from 'app/core/state/models/entity-association-list';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: entityAssociationReducer
})
@Component({
  selector: 'gv-entity-association-create-or-add',
  templateUrl: './entity-association-create-or-add.component.html',
  styleUrls: ['./entity-association-create-or-add.component.css']
})
export class EntityAssociationCreateOrAddComponent extends EntityAssociationAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<EntityAssociationDetail>;

  // path to the substore
  @Input() basePath: string[];

  // select observables of substore properties
  @select() targetClassConfig$: Observable<ClassConfig>;
  @select() propertyConfig$: Observable<RoleSet>;
  @select() entityAssociation$: Observable<InfEntityAssociation>;
  @select() existingList$: Observable<EntityAssociationList>;

  // emits the nested peIt, no matter if created, added, opened or selected!
  @Output() done = new EventEmitter<InfEntityAssociation>();

  // on cancel
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('f') form: NgForm;

  getKey(_, item) {
    return item.key;
  }

  constructor(
    protected rootEpics: RootEpics,
    private epics: EntityAssociationAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private eaApi: InfEntityAssociationApi
  ) {
    super()
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, entityAssociationReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    combineLatest(
      this.entityAssociation$, this.ngRedux.select<number>(['activeProject', 'pk_project']),
      this.ngRedux.select<ProjectCrm>(['activeProject', 'crm']),
      this.propertyConfig$
    ).pipe(
      first(ds => (ds.filter(d => (!d)).length === 0)),
      takeUntil(this.destroy$)
    ).subscribe((d) => {
      const ea = d[0], pkProject = d[1], crm = d[2], propertyConfig = d[3];
      this.load(pkProject,
        ea.fk_range_entity || null,
        ea.fk_domain_entity || null,
        ea.fk_property || null,
        crm,
        propertyConfig
      )
    })
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onCreateNew(ea: InfEntityAssociation) {
    this.eaApi.findOrCreateInfEntityAssociation(this.ngRedux.getState().activeProject.pk_project, ea).subscribe(
      (eas) => { this.done.emit(eas[0]) }
    )
  }

  submitCreateForm() {
    if (this.form.form.valid) {
      this.onCreateNew(this.form.form.value.ea)
    }
  }


}
