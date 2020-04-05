import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, SysConfig, IAppState } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { BehaviorSubject, combineLatest, Subject, of, Observable } from 'rxjs';
import { first, takeUntil, map } from 'rxjs/operators';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { InformationBasicPipesService } from '../../new-services/information-basic-pipes.service';
import { temporalEntityListDefaultLimit, createPaginateBy } from '../temporal-entity-list/temporal-entity-list.component';
import { ActionResultObservable } from '../../../../core/store/actions';
import { NgRedux } from '../../../../../../node_modules/@angular-redux/store';
import { InfSelector } from '../../../../core/inf/inf.service';
import { PaginationService } from '../../new-services/pagination.service';

@Component({
  selector: 'gv-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number
  @Input() showOntoInfo$: Observable<boolean>;

  loadingAlternatives$ = new BehaviorSubject<boolean>(false);

  alternatives$;
  isLeafItemList$;
  appContext: number = SysConfig.PK_UI_CONTEXT_ADD;
  infRepo: InfSelector;
  constructor(
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public b: InformationBasicPipesService,
    public p: ActiveProjectService,
    public inf: InfActions,
    private ngRedux: NgRedux<IAppState>,
  ) {
    this.infRepo = new InfSelector(this.ngRedux, of('repo'))
  }

  ngOnInit() {
    this.isLeafItemList$ = this.t.showControl$.pipe(
      map(listDefinition => listDefinition && ['appellation', 'language', 'place', 'text-property', 'entity-preview']
        .includes(listDefinition.listType))
    )

    combineLatest(this.p.pkProject$, this.t.showControl$).pipe(first(), takeUntil(this.destroy$)).subscribe(([pkProject, listDefinition]) => {
      let loading$: ActionResultObservable<any>;
      this.loadingAlternatives$.next(true);

      if (listDefinition.listType === 'text-property') {
        loading$ = this.loadTextProperties(listDefinition, pkProject);
      }
      else if (listDefinition.listType === 'temporal-entity') {
        loading$ = this.loadTemporalEntityList(listDefinition, pkProject);
      }
      else {
        if (listDefinition.isOutgoing) {
          loading$ = this.loadRolesOutgoing(listDefinition, pkProject);
        }
        else {
          loading$ = this.loadRolesIngoing(listDefinition, pkProject);
        }
      }

      loading$.resolved$
        .pipe(takeUntil(this.destroy$))
        .subscribe(resolved => { this.updateUiAfterLoading(); });

    })
  }

  private loadTemporalEntityList(listDefinition, pkProject: number): ActionResultObservable<any> {
    this.alternatives$ = this.infRepo.role$.pagination$.pipeCount(createPaginateBy(listDefinition, this.pkEntity))
    return this.inf.temporal_entity.loadPaginatedAlternativeList(
      pkProject,
      this.pkEntity,
      listDefinition.pkProperty,
      listDefinition.targetClass,
      listDefinition.isOutgoing,
      temporalEntityListDefaultLimit,
      0);
  }

  private loadTextProperties(listDefinition, pkProject: number): ActionResultObservable<any> {
    this.alternatives$ = this.i.pipeAltListTextProperty(listDefinition, this.pkEntity);
    return this.inf.text_property.loadAlternatives(this.pkEntity, listDefinition.fkClassField, pkProject)
  }

  /**
   * load alternative ingoing roles
   */
  private loadRolesIngoing(listDefinition, pkProject: number): ActionResultObservable<any> {
    this.alternatives$ = this.b.pipeAlternativeIngoingRoles(listDefinition.pkProperty, this.pkEntity);
    return this.inf.role.loadIngoingAlternatives(this.pkEntity, listDefinition.pkProperty, pkProject)
  }

  /**
   * load alternative outgoing roles
   */
  private loadRolesOutgoing(listDefinition, pkProject: number): ActionResultObservable<any> {
    this.alternatives$ = this.b.pipeAlternativeOutgoingRoles(listDefinition.pkProperty, this.pkEntity);
    return this.inf.role.loadOutgoingAlternatives(this.pkEntity, listDefinition.pkProperty, pkProject)
  }

  private updateUiAfterLoading() {
    this.alternatives$.pipe(first(), takeUntil(this.destroy$)).subscribe(
      alt => {
        if ((typeof alt === 'number' && alt > 0) || (typeof alt !== 'number' && alt.length > 0)) {
          this.loadingAlternatives$.next(false);
        }
        else {
          this.t.showCreateRole$.next(this.t.showControl$.value);
          this.t.showControl$.next(null);
        }
      }
    );
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}
