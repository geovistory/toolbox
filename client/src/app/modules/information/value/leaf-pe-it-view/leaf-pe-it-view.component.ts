import { NgRedux, ObservableStore, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ClassConfig, IAppState, InfPersistentItem, InfRole, ProjectDetail } from 'app/core';
import { FieldList,  ClassInstanceLabel, PeItDetail, SubstoreComponent } from 'app/core/state/models';
import { RootEpics } from 'app/core/store/epics';
import { combineLatest, Observable, ReplaySubject, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { LeafPeItViewAPIActions } from './api/leaf-pe-it-view.actions';
import { LeafPeItViewAPIEpics } from './api/leaf-pe-it-view.epics';
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

  // select observables of substore properties
  @select() _fields$: Observable<FieldList>;
  @select() pkEntity$: Observable<number>;
  @select() peIt$: Observable<InfPersistentItem>;
  @select() loading$: Observable<boolean>;

  project$: Observable<ProjectDetail>;

  @Input() pkEntity: number; // TODO: remove this input, it is not used anymore since the info is in state
  @Input() isCircular: boolean;

  peItState: PeItDetail;

  leafPeItStateInitialized: boolean;
  leafPeItLoading$: ReplaySubject<boolean>;

  classConfig: ClassConfig;

  /**
  * Properties
  */
  label:  ClassInstanceLabel;

  isInProject: boolean;

  isSelected = false;

  pkProject: number;

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected rootEpics: RootEpics,
    private epics: LeafPeItViewAPIEpics,
    public ngRedux: NgRedux<IAppState>,
    private modalService: NgbModal

  ) {
    super()
    console.log('LeafPeItViewComponent')
  }

  getBasePath = () => this.basePath;

  ngOnInit() {
    this.localStore = this.ngRedux.configureSubStore(this.basePath, leafPeItViewReducer);
    this.rootEpics.addEpic(this.epics.createEpics(this));

    this.localStore.select<PeItDetail>('').takeUntil(this.destroy$).subscribe(p => {
      this.peItState = p;
      if (this.peItState && this.peItState.fkClass) {
        this.classConfig = this.ngRedux.getState().activeProject.crm.classes[this.peItState.fkClass];
      }
    });


    this.project$ = this.ngRedux.select<ProjectDetail>('activeProject');

    // load leaf peit detail if pkE and project are there and if not loading and no _fields
    combineLatest(this.pkEntity$, this.project$).pipe(
      filter((d) => {
        const pkE = d[0], p = d[1], state = this.localStore.getState();
        if (pkE && (p && p.pk_project && p.crm) && !state._fields && !state.loading) return true;
      }),
      takeUntil(this.destroy$)
    ).subscribe((d) => {
      const pkE = d[0], p = d[1];
      this.load(pkE, p);
    })


  }


  ngOnDestroy() {
    // this.destroy();
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }


  open() {
    const open = () => {

      this.router.navigate(['../', this.peItState.peIt.pk_entity], {
        relativeTo: this.route,
        queryParamsHandling: 'merge'
      })
        .then(() => {
          console.log('ok')
        }).catch(() => {
          console.log('oops')
        })
    }


    const entityModalOptions: NgbModalOptions = {
      size: 'lg'
    }

    const modalRef = this.modalService.open(LeafPeItViewModalComponent, entityModalOptions);

    modalRef.componentInstance.isInProject = (this.peItState.peIt.entity_version_project_rels && this.peItState.peIt.entity_version_project_rels.length)
    modalRef.componentInstance.parentPath = this.basePath;
    modalRef.componentInstance.peItState = this.peItState;

    modalRef.result
      .then(() => { open() })
      .catch(() => { });


  }

}
