import { NgRedux, WithSubStore } from '@angular-redux/store';
import { Component, EventEmitter, forwardRef, Input, OnDestroy, OnInit, Output, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { IAppState, InfRole } from 'app/core';
import { AutoUnsubscribe } from 'ngx-auto-unsubscribe';
import { ReplaySubject, Subscription } from 'rxjs';

import { PeItDetail } from '../../information.models';
import { StateCreatorService } from '../../shared/state-creator.service';
import { StateToDataService } from '../../shared/state-to-data.service';
import { LeafPeItActions } from './leaf-pe-it-view.actions';
import { leafPeItReducer } from './leaf-pe-it-view.reducer';


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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LeafPeItViewComponent),
      multi: true
    }
  ]
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


  /**
  * Properties
  */
  label: string;

  isInProject: boolean;

  isSelected: boolean = false;

  pkProject: number;

  subs: Subscription[] = [];

  // parent role, needed to create a proper role value to emit onChange of the form
  role: InfRole;

  constructor(
    // private route: ActivatedRoute,
    // private router: Router,
    private ngRedux: NgRedux<IAppState>,
    private modalService: NgbModal,
    protected stateCreator: StateCreatorService

  ) {
    super()
  }


  ngOnInit() {

    this.subs.push(this.ngRedux.select<PeItDetail>(this.basePath).subscribe(d => {
      this.peItState = d;
      if (d.pkEntity)
        this.label = StateToDataService.getDisplayAppeLabelOfPeItRoleSets(d._roleSet_list);
      else
        this.initPeItState()
    }))


  }

  /**
   * Initializes the peIt preview
   */
  initPeItState() {
    this.leafPeItLoading$ = new ReplaySubject<boolean>();
    this.leafPeItLoading$.next(true);

    const pkProject = this.ngRedux.getState().activeProject.pk_project;
    this.subs.push(
      this.stateCreator.initializePeItState(this.pkEntity, pkProject).subscribe(peItState => {

        this.peItState = peItState;
        if (peItState)
          this.label = StateToDataService.getDisplayAppeLabelOfPeItRoleSets(peItState._roleSet_list);

        this.leafPeItStateAdded(peItState)
        this.leafPeItLoading$.next(false);
      }));

  }



  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe())
  }


  open() {
    // const urlTree = this.router.createUrlTree(["..", this.pkEntity], { relativeTo: this.route, preserveQueryParams:true });
    // window.open(this.router.serializeUrl(urlTree), '_blank')
    const open = () => {

      // this.router.navigate(["../", this.peItState.peIt.pk_entity], {
      //   relativeTo: this.route,
      //   queryParamsHandling: 'merge'
      // })
      //   .then(() => {
      //     console.log('ok')
      //   }).catch(() => {
      //     console.log('oops')
      //   })
    }


    const entityModalOptions: NgbModalOptions = {
      size: 'lg'
    }

    const modalRef = this.modalService.open(LeafPeItViewComponent, entityModalOptions);

    modalRef.componentInstance.isInProject = (this.peItState.peIt.entity_version_project_rels && this.peItState.peIt.entity_version_project_rels.length)
    modalRef.componentInstance.parentPath = this.basePath;
    modalRef.componentInstance.peItState = this.peItState;

    modalRef.result
      .then(() => { open() })
      .catch(() => { });


  }

}
