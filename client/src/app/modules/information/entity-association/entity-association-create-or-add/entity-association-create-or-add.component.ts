import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClassConfig, IAppState, InfEntityAssociation, InfEntityAssociationApi, InfPersistentItemApi, ProjectCrm, PropertyField, SubstoreComponent } from 'app/core';
import { EntityAssociationDetail } from 'app/core/state/models/entity-association-detail';
import { EntityAssociationList } from 'app/core/state/models/entity-association-list';
import { RootEpics } from 'app/core/store/epics';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { EntityAssociationAPIActions } from '../api/entity-association.actions';
import { EntityAssociationAPIEpics } from '../api/entity-association.epics';
import { entityAssociationReducer } from '../api/entity-association.reducer';


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
  @select() propertyConfig$: Observable<PropertyField>;
  @select() entityAssociation$: Observable<InfEntityAssociation>;
  @select() existingList$: Observable<EntityAssociationList>;
  existingNotInProject$: Observable<EntityAssociationList>;

  // emits the nested peIt, no matter if created, added, opened or selected!
  @Output() done = new EventEmitter<InfEntityAssociation>();

  // on cancel
  @Output() cancel = new EventEmitter<void>();

  @ViewChild('f') form: NgForm;

  ea; // model of ngForm control

  getKey(_, item) {
    return item.key;
  }


  constructor(
    protected rootEpics: RootEpics,
    private epics: EntityAssociationAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private eaApi: InfEntityAssociationApi,
    private peItApi: InfPersistentItemApi,
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
        ea.fk_info_range || null,
        ea.fk_info_domain || null,
        ea.fk_property || null,
        crm,
        propertyConfig
      )
    })

    this.existingNotInProject$ = this.existingList$.pipe(map((ead) => {
      const o = {}
      for (const key in ead) {
        if (ead.hasOwnProperty(key)) {
          const ea = ead[key];
          if (!this.inProject(ea)) o[key] = ea;
        }
      }
      return o;
    }));
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

  onAdd(eaD: EntityAssociationDetail) {
    const pkEntity = eaD.isOutgoing ? eaD.entityAssociation.fk_info_range : eaD.entityAssociation.fk_info_domain;
    this.peItApi.addToProject(this.ngRedux.getState().activeProject.pk_project, pkEntity).subscribe(
      (peIts) => {

        this.eaApi.findOrCreateInfEntityAssociation(this.ngRedux.getState().activeProject.pk_project, {
          fk_info_domain: eaD.entityAssociation.fk_info_domain,
          fk_info_range: eaD.entityAssociation.fk_info_range,
          fk_property: eaD.entityAssociation.fk_property,
          entity_version_project_rels: [{
            is_in_project: true
          }]
        } as InfEntityAssociation).subscribe(
          (ea) => { this.done.emit(eaD.entityAssociation) }
        )
      }
    )
  }

  onOpen = (ead: EntityAssociationDetail) => this.done.emit(ead.entityAssociation);

  submitCreateForm() {
    if (this.form.form.valid) {
      this.onCreateNew(this.form.form.value.ea)
    }
  }

  inProject(eaD: EntityAssociationDetail) {
    return !eaD.entityAssociation ? false :
      !eaD.entityAssociation.entity_version_project_rels ? false :
        !eaD.entityAssociation.entity_version_project_rels[0] ? false :
          eaD.entityAssociation.entity_version_project_rels[0].is_in_project;
  }


}
