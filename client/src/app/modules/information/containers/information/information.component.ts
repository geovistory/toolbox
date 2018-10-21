import { Component, OnDestroy, Input, OnInit } from '@angular/core';
import { Subject, Observable, combineLatest } from 'rxjs';
import { ObservableStore, WithSubStore, NgRedux, select } from '@angular-redux/store';
import { IAppState, SubstoreComponent, InfPersistentItem, PeItDetail, PeItSearchHit, ProjectCrm, U, ComConfig } from 'app/core';
import { RootEpics } from 'app/core/store/epics';
import { Information } from './api/information.models';
import { InformationAPIEpics } from './api/information.epics';
import { InformationAPIActions } from './api/information.actions';
import { informationReducer } from './api/information.reducer';
import { MentionedEntity } from 'app/modules/annotation';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityAddModalService } from '../../shared/entity-add-modal.service';
import { MentionedEntityCtrlActions } from 'app/modules/annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.actions';
import { mentionedEntityCtrlReducer } from 'app/modules/annotation/containers/mentioned-entities-ctrl/mentioned-entities-ctrl.reducer';
import { EntityAddModalComponent } from '../../add-modal/entity-add-modal/entity-add-modal.component';
import { takeUntil, first } from 'rxjs/operators';
import { CreateOrAddPeIt } from '../create-or-add-pe-it/api/create-or-add-pe-it.models';

@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: informationReducer
})
@Component({
  selector: 'gv-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent extends InformationAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<Information>;

  // path to the substore
  @Input() basePath: string[];

  @select() _peIt_editable$: Observable<PeItDetail>;
  @select() _peIt_add$: Observable<CreateOrAddPeIt>;
  @select() _peIt_list$: Observable<PeItSearchHit[]>;
  @select() loading$: Observable<boolean>;
  @select() collectionSize$: Observable<number>;

  // Primary key of the Entity to be viewed or edited
  pkEntity: number;

  listVisible = true;

  persistentItems: InfPersistentItem[] = [];
  projectId: number;

  selectingEntities$: Observable<boolean>;
  mentionedEntitiesCrtlStore: ObservableStore<{ [key: string]: MentionedEntity }>

  // Pagination
  collectionSize: number; // number of search results
  limit = 10; // max number of results on a page
  page = 1; // current page

  // Search
  searchString = '';
  errorMessages: any;


  entityModalOptions: NgbModalOptions = {
    size: 'lg'
  }

  pkClassesOfAddBtn;
  pkUiContextCreate = ComConfig.PK_UI_CONTEXT_DATAUNITS_CREATE;

  constructor(
    protected rootEpics: RootEpics,
    private epics: InformationAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private activatedRoute: ActivatedRoute,
    private modalService: NgbModal,
    private entityAddModalService: EntityAddModalService,
    private router: Router,
    private mEntitiesActions: MentionedEntityCtrlActions

  ) {
    super()

    this.pkEntity = activatedRoute.snapshot.params['pkEntity'];
    this.projectId = activatedRoute.snapshot.parent.params['id'];

    // if component is activated by ng-router, take base path here
    activatedRoute.data.subscribe(d => {
      this.basePath = d.reduxPath;
    })

    // listen to the crm and add extract the classes ready to add.
    ngRedux.select<ProjectCrm>(['activeProject', 'crm']).pipe(
      first(d => !!d),
      takeUntil(this.destroy$)).subscribe(crm => {
        this.pkClassesOfAddBtn = []
        for (const key in crm.classes) {
          if (crm.classes[key] && crm.classes[key].isInProject) {
            this.pkClassesOfAddBtn.push(crm.classes[key].dfh_pk_class);
          }
        }
      })

    // listen to selecting entities for annotation
    this.selectingEntities$ = ngRedux.select<boolean>(['sources', 'edit', 'annotationPanel', 'edit', 'selectingEntities']);

    this.mentionedEntitiesCrtlStore =
      ngRedux.configureSubStore(['sources', 'edit', 'annotationPanel', 'edit', 'mentionedEntities'], mentionedEntityCtrlReducer)

    // if one of the observables returns truthy, list is not visible
    combineLatest(this._peIt_editable$, this._peIt_add$).takeUntil(this.destroy$).subscribe(d => {
      this.listVisible = !d.find(item => !!(item));
    })

    this.collectionSize$.takeUntil(this.destroy$).subscribe(d => { this.collectionSize = d })

  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, informationReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    // init the search
    if (this.pkEntity) this.openEntityEditor(this.pkEntity, this.projectId)
    else this.searchProjectPeIts();

    // listen to route changes
    this.activatedRoute.params.subscribe(params => {
      if (params.pkEntity && params.pkEntity != this.pkEntity) {
        this.pkEntity = params.pkEntity;
        this.openEntityEditor(this.pkEntity, this.projectId)
      }
    })

    this.entityAddModalService.onAdd.subscribe(success => {
      this.searchProjectPeIts();
    })

    this.entityAddModalService.onOpen.subscribe(pkInfPersistentItem => {
      this.openEntity(pkInfPersistentItem);
    })
  }

  searchProjectPeIts() {
    this.search(this.projectId, this.searchString, this.limit, this.page)
  }

  openEntityModal() {
    const modalRef = this.modalService.open(EntityAddModalComponent, this.entityModalOptions);
    modalRef.componentInstance.projectId = this.projectId;
    this.entityAddModalService.state = 'choose-class';

  }

  openEntity(pkInfPersistentItem) {
    this.router.navigate(['../entity', pkInfPersistentItem], {
      relativeTo: this.activatedRoute, queryParamsHandling: 'merge'
    })
    // routerLink="../entity/{{persistentItem.pk_persistent_item}}" queryParamsHandling="merge"
  }



  selectMentionedEntity(entity: MentionedEntity) {
    this.mentionedEntitiesCrtlStore.dispatch(this.mEntitiesActions.addMentionedEntity(entity))
  }

  get hitsFrom() {
    return (this.limit * (this.page - 1)) + 1;
  }
  get hitsTo() {
    const upper = (this.limit * (this.page - 1)) + this.limit;
    return upper > this.collectionSize ? this.collectionSize : upper;
  }

  pageChange() {
    this.searchProjectPeIts();
  }

  searchStringChange() {
    this.page = 1;
    this.searchProjectPeIts();
  }

  ngOnDestroy() {
    this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
