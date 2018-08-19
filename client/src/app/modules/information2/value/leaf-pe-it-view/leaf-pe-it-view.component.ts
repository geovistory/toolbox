import { NgRedux, select, WithSubStore } from '@angular-redux/store';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ClassConfig, IAppState, InfPersistentItem, InfRole } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { dropLast } from 'ramda';
import { Observable, ReplaySubject, Subscription } from 'rxjs';

import { DataUnitChildList, DataUnitLabel, PeItDetail } from '../../information.models';
import { StateCreatorService } from '../../shared/state-creator.service';
import { LeafPeItViewModalComponent } from './leaf-pe-it-view-modal/leaf-pe-it-view-modal.component';
import { LeafPeItActions } from './leaf-pe-it-view.actions';
import { leafPeItReducer } from './leaf-pe-it-view.reducer';
import { ActivatedRoute, Router } from '@angular/router';

@AutoUnsubscribe()
@WithSubStore({
  basePathMethodName: 'getBasePath',
  localReducer: leafPeItReducer
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
export class LeafPeItViewComponent extends LeafPeItActions implements OnInit, OnDestroy {

  @Input() pkEntity: number;
  @Input() isCircular: boolean;
  @Input() basePath: string[];
  getBasePath = () => this.basePath;


  peItState: PeItDetail;

  /**
  * Outputs
  */
  @Output() touched: EventEmitter<void> = new EventEmitter();

  leafPeItStateInitialized: boolean;
  leafPeItLoading$: ReplaySubject<boolean>;

  classConfig: ClassConfig;

  /**
  * Properties
  */
  label: DataUnitLabel;

  isInProject: boolean;

  isSelected: boolean = false;

  pkProject: number;

  subs: Subscription[] = [];

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;

  @select() peIt$: Observable<InfPersistentItem>;
  @select() _children$: Observable<DataUnitChildList>;
  @select() loading$: Observable<boolean>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private modalService: NgbModal,
    protected stateCreator: StateCreatorService

  ) {
    super()
    console.log('LeafPeItViewComponent')
  }

  ngOnInit() {


    const peItDetail = this.ngRedux.configureSubStore(this.basePath, leafPeItReducer).getState();

    if (peItDetail && peItDetail.fkClass) {
      this.classConfig = this.ngRedux.getState().activeProject.crm.classes[peItDetail.fkClass];
    }
    if (!peItDetail || !peItDetail.peIt) {
      // console.log('LeafPeItViewComponent leafPeItStartLoading', this.pkEntity)

      this.initPeItState();
    }

    // else
    //   this.label = U.labelFromDataUnitChildList(peItDetail._children);

  }

  /**
   * Initializes the peIt preview
   */
  initPeItState() {
    this.leafPeItLoading$ = new ReplaySubject<boolean>();
    this.leafPeItLoading$.next(true);
    this.leafPeItStartLoading(this.pkEntity);

    const pkProject = this.ngRedux.getState().activeProject.pk_project;
    this.subs.push(
      this.stateCreator.initializePeItState(this.pkEntity, pkProject).subscribe(peItState => {

        this.peItState = peItState;

        if (peItState && peItState.fkClass && !this.classConfig) {
          this.classConfig = this.ngRedux.getState().activeProject.crm.classes[peItState.fkClass];
        }

        this.leafPeItStateAdded(peItState)
        this.leafPeItLoading$.next(false);
      }));

  }



  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  open() {
    const open = () => {

      this.router.navigate(["../", this.peItState.peIt.pk_entity], {
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
