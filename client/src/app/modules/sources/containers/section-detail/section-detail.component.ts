import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ActiveProjectService, ComConfig, EntityPreview, IAppState, PeItDetail, SubstoreComponent, ClassInstanceLabel } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { ClassAndTypePk } from 'app/modules/information/containers/class-and-type-selector/api/class-and-type-selector.models';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/api/create-or-add-entity.models';
import { combineLatest, Observable, Subject, BehaviorSubject } from 'rxjs';
import { filter, takeUntil, first } from 'rxjs/operators';
import { SectionDetailAPIActions } from './api/section-detail.actions';
import { SectionDetailAPIEpics } from './api/section-detail.epics';
import { SectionDetail } from './api/section-detail.models';
import { sectionDetailReducer } from './api/section-detail.reducer';
import { path } from 'ramda';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: sectionDetailReducer
})
@Component({
  selector: 'gv-section-detail',
  templateUrl: './section-detail.component.html',
  styleUrls: ['./section-detail.component.scss']
})
export class SectionDetailComponent extends SectionDetailAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  @HostBinding('class.h-100') h = true;
  @HostBinding('class.gv-flex-fh') flexFh = true;

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<SectionDetail>;

  // path to the substore
  @Input() basePath: string[];
  // Primary key of the Entity to be viewed or edited
  @Input() pkEntity: number;
  // Class and Type pks of the Entity to be created
  @Input() classAndTypePk: ClassAndTypePk;

  @Output() close = new EventEmitter<void>();

  @select() pkSource$: Observable<number>;
  @select() editSection$: Observable<PeItDetail>;
  @select() add$: Observable<CreateOrAddEntity>;
  @select() loading$: Observable<boolean>;
  @select() removed$: Observable<boolean>;
  sectionPreview$ = new BehaviorSubject<EntityPreview>(undefined);
  sourcePreview$ = new BehaviorSubject<EntityPreview>(undefined);

  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_SOURCES_CREATE;

  constructor(
    protected rootEpics: RootEpics,
    private epics: SectionDetailAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    public router: Router,
    private p: ActiveProjectService
  ) {
    super();
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, sectionDetailReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.removed$.pipe(filter(b => b === true), takeUntil(this.destroy$)).subscribe(removed => {
      this.close.emit()
    })

    this.pkSource$.pipe(filter(b => !!b), takeUntil(this.destroy$)).subscribe(pk => {
      this.p.streamEntityPreview(pk).takeUntil(this.destroy$)
        .subscribe(a => {
          this.sourcePreview$.next(a);
        })
    })

    if (this.pkEntity) this.initEntity(this.pkEntity)
    else if (this.classAndTypePk) this.startCreate(this.classAndTypePk, this.pkUiContextCreate);



  }

  initEntity(pkEntity) {

    this.p.streamEntityPreview(pkEntity).takeUntil(this.destroy$)
      .subscribe(a => { this.sectionPreview$.next(a); })

    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.loadSourcePreview(pkEntity, pkProject)
    })

    this.pkEntity = pkEntity;
    combineLatest(this.p.crm$, this.p.pkProject$, this.sourcePreview$).pipe(
      filter((d) => (d.filter((i) => !i).length === 0)),
      takeUntil(this.destroy$)
    ).subscribe(([crm, pkProject, sourcePreview]) => {
      this.loadSectionDetails(this.pkEntity, sourcePreview.pk_entity, pkProject, crm);
    })

  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onPeItLabelChange(label: ClassInstanceLabel) {
    combineLatest(this.sourcePreview$, this.sectionPreview$)
      .pipe(
        first(([sou, se]) => (!!sou.entity_label && !!se.entity_label)),
        takeUntil(this.destroy$)).subscribe(([source, section]) => {

        const newTabTitle = (section.type_label || section.class_label) + ' ' +
          path<string>(['parts', 0, 'roleLabels', 0, 'string'], label) +
          ' in ' + source.entity_label;
        if (this.localStore.getState().tabTitle !== newTabTitle) this.setTabTitle(newTabTitle);
      })
  }


  onRemoveSection = (pkSection: number) => {
    combineLatest(this.sourcePreview$, this.p.pkProject$).pipe(
      first(([sou, pkProject]) => (!!sou && !!pkProject)),
      takeUntil(this.destroy$)
    ).subscribe(([sou, pkProject]) => {
      this.removeSection(pkSection, sou.fk_class, sou.pk_entity, pkProject)
    })
  }

  /**
   * listen to changes of the section being edited and updates 'list'
   * in order to apply the changes to the list
   */
  onSectionChange() {
    // this.search()
  }

}
