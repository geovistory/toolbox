import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ActiveProjectService, ClassConfig, IAppState, InfPersistentItem, InfRole } from 'app/core';
import { ClassInstanceLabel, EntityPreview, FieldList, PeItDetail, SubstoreComponent } from 'app/core/state/models';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { LeafPeItViewAPIActions } from './api/leaf-pe-it-view.actions';
import { LeafPeItView } from './api/leaf-pe-it-view.models';
import { leafPeItViewReducer } from './api/leaf-pe-it-view.reducer';
import { LeafPeItViewModalComponent } from './leaf-pe-it-view-modal/leaf-pe-it-view-modal.component';


@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: leafPeItViewReducer
})
@Component({
  selector: 'gv-leaf-pe-it-view',
  templateUrl: './leaf-pe-it-view.component.html',
  styleUrls: ['./leaf-pe-it-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => LeafPeItViewComponent),
  //     multi: true
  //   }
  // ]
})
export class LeafPeItViewComponent extends LeafPeItViewAPIActions implements OnInit, OnDestroy, SubstoreComponent {

  // emits true on destroy of this component
  destroy$ = new Subject<boolean>();

  // local store of this component
  localStore: ObservableStore<LeafPeItView>;

  // path to the substore
  @Input() basePath: string[];

  // define where to open the pe it, if user opens Modal and clicks on Open.
  @Input() openIn: 'information' | 'source' | 'section' = 'information';


  // select observables of substore properties
  @select() _fields$: Observable<FieldList>;
  @select() pkEntity$: Observable<number>;
  @select() peIt$: Observable<InfPersistentItem>;
  @select() loading$: Observable<boolean>;
  preview$: Observable<EntityPreview>;

  @Input() isCircular: boolean;
  @Input() pkEntity: number;
  @Input() sectionParentPk: number; // this is a hacky way to give the source pk, useful to open a section
  peItState: PeItDetail;

  leafPeItStateInitialized: boolean;
  leafPeItLoading$: ReplaySubject<boolean>;

  classConfig: ClassConfig;

  /**
  * Properties
  */
  label: ClassInstanceLabel;

  isInProject: boolean;

  isSelected = false;

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;

  constructor(
    // protected rootEpics: RootEpics,
    // private epics: LeafPeItViewAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private modalService: NgbModal,
    private p: ActiveProjectService

  ) {
    super()
    // console.log('LeafPeItViewComponent')
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, leafPeItViewReducer);
    // this.rootEpics.addEpic(this.epics.createEpics(this));

    this.localStore.select<PeItDetail>('').takeUntil(this.destroy$).subscribe(p => {
      this.peItState = p;
      if (this.peItState && this.peItState.fkClass) {
        this.classConfig = this.ngRedux.getState().activeProject.crm.classes[this.peItState.fkClass];
      }
    });


    // load leaf peit detail if pkE and project are there and if not loading and no _fields
    combineLatest(this.pkEntity$).pipe(
      filter((d) => (!!d[0])),
      takeUntil(this.destroy$)
    ).subscribe((d) => {
      this.pkEntity = d[0];
      this.p.streamEntityPreview(this.pkEntity);
    })

    // if pkEntity is provided by input
    this.p.streamEntityPreview(this.pkEntity);

    this.preview$ = this.ngRedux.select<EntityPreview>(['activeProject', 'entityPreviews', this.pkEntity]);

  }


  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  open() {


    this.p.loadEntityDetailForModal(this.pkEntity);

    const navigate = () => {
      if (this.openIn === 'information') {
        this.p.addTab({
          active: true,
          component: 'entity-detail',
          icon: 'persistent-entity' ,
          pathSegment: 'entityDetails',
          data: {
            pkEntity: this.pkEntity
          }
        });
      } else if (this.openIn === 'source') {
        this.p.addTab({
          active: true,
          component: 'source-detail',
          icon: 'source',
          pathSegment: 'sourceDetails',
          data: {
            pkEntity: this.pkEntity
          }
        });
      } else if (this.openIn === 'section') {
        this.p.addTab({
          active: true,
          component: 'section-detail',
          icon: 'section',
          pathSegment: 'sectionDetails',
          data: {
            pkEntity: this.pkEntity
          }
        })
      }
    }


    const entityModalOptions: NgbModalOptions = {
      size: 'lg'
    }

    const modalRef = this.modalService.open(LeafPeItViewModalComponent, entityModalOptions);

    modalRef.componentInstance.pkEntity = this.pkEntity;

    modalRef.result
      .then(() => { navigate() })
      .catch(() => { });


  }

}
