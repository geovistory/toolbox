import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActiveProjectService, IAppState, SysConfig, InfRole } from 'app/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { SchemaObjectService } from 'app/core/store/schema-object.service';
import { BehaviorSubject, combineLatest, Observable, of, Subject, ObservedValueOf } from 'rxjs';
import { first, map, takeUntil } from 'rxjs/operators';
import { NgRedux } from '../../../../../../node_modules/@angular-redux/store';
import { InfSelector } from '../../../../core/inf/inf.service';
import { ActionResultObservable } from '../../../../core/store/actions';
import { InformationBasicPipesService } from '../../services/information-basic-pipes.service';
import { InformationPipesService } from '../../services/information-pipes.service';
import { ListDefinition } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { createPaginateBy, temporalEntityListDefaultLimit } from '../temporal-entity-list/temporal-entity-list.component';
import { SchemaObject } from 'app/core/store/model';

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
    public s: SchemaObjectService,
    public inf: InfActions,
    private ngRedux: NgRedux<IAppState>,
  ) {
    this.infRepo = new InfSelector(this.ngRedux, of('repo'))
  }

  ngOnInit() {
    this.isLeafItemList$ = this.t.showControl$.pipe(
      map(listDefinition => listDefinition && ['appellation', 'language', 'place', 'text-property', 'lang-string', 'entity-preview']
        .includes(listDefinition.listType))
    )

    // combineLatest(this.p.pkProject$, this.t.showControl$).pipe(first(), takeUntil(this.destroy$)).subscribe(([pkProject, listDefinition]) => {
    //   let loading$: Observable<any>;
    //   this.loadingAlternatives$.next(true);

    //   if (listDefinition.listType === 'text-property') {
    //     loading$ = this.loadTextProperties(listDefinition, pkProject).resolved$;
    //   }
    //   else if (listDefinition.listType === 'temporal-entity') {
    //     loading$ = this.loadTemporalEntityList(listDefinition, pkProject).resolved$;
    //   }
    //   else {
    //     if (listDefinition.isOutgoing) {
    //       loading$ = this.loadRolesOutgoing(listDefinition, pkProject);
    //     }
    //     else {
    //       loading$ = this.loadRolesIngoing(listDefinition, pkProject);
    //     }
    //   }

    //   loading$
    //     .pipe(takeUntil(this.destroy$))
    //     .subscribe(resolved => { this.updateUiAfterLoading(); });

    // })
  }

  // private loadTemporalEntityList(listDefinition: ListDefinition, pkProject: number): ActionResultObservable<any> {
  //   this.alternatives$ = this.infRepo.role$.pagination$.pipeCount(createPaginateBy(listDefinition, this.pkEntity))
  //   return this.inf.temporal_entity.loadPaginatedAlternativeList(
  //     pkProject,
  //     this.pkEntity,
  //     listDefinition.property.pkProperty,
  //     listDefinition.targetClass,
  //     listDefinition.isOutgoing,
  //     temporalEntityListDefaultLimit,
  //     0);
  // }

  // private loadTextProperties(listDefinition: ListDefinition, pkProject: number): ActionResultObservable<any> {
  //   this.alternatives$ = this.i.pipeAltListTextProperty(listDefinition, this.pkEntity);
  //   return this.inf.text_property.loadAlternatives(this.pkEntity, listDefinition.fkClassField, pkProject)
  // }

  // /**
  //  * load alternative ingoing roles
  //  */
  // private loadRolesIngoing(listDefinition: ListDefinition, pkProject: number): Observable<SchemaObject> {
  //   this.alternatives$ = this.b.pipeAlternativeIngoingRoles(listDefinition.property.pkProperty, this.pkEntity);

  //   const filterObject: Partial<InfRole> = {
  //     fk_entity: this.pkEntity,
  //     fk_property: listDefinition.property.pkProperty,
  //     fk_property_of_property: listDefinition.property.pkPropertyOfProperty
  //   }

  //   return this.s.store(this.s.api.listAlternativeLeafItems(pkProject, filterObject), 'ofRepo')


  //   // return this.inf.role.loadIngoingAlternatives(this.pkEntity, listDefinition.property.pkProperty, pkProject)
  // }

  // /**
  //  * load alternative outgoing roles
  //  */
  // private loadRolesOutgoing(listDefinition: ListDefinition, pkProject: number): Observable<SchemaObject> {
  //   this.alternatives$ = this.b.pipeAlternativeOutgoingRoles(listDefinition.property.pkProperty, this.pkEntity);

  //   const filterObject: Partial<InfRole> = {
  //     fk_temporal_entity: this.pkEntity,
  //     fk_property: listDefinition.property.pkProperty,
  //     fk_property_of_property: listDefinition.property.pkPropertyOfProperty
  //   }

  //   return this.s.store(this.s.api.listAlternativeLeafItems(pkProject, filterObject), 'ofRepo')
  // }

  // private updateUiAfterLoading() {
  //   this.alternatives$.pipe(first(), takeUntil(this.destroy$)).subscribe(
  //     alt => {
  //       if ((typeof alt === 'number' && alt > 0) || (typeof alt !== 'number' && alt.length > 0)) {
  //         this.loadingAlternatives$.next(false);
  //       }
  //       else {
  //         this.t.showCreateRole$.next(this.t.showControl$.value);
  //         this.t.showControl$.next(null);
  //       }
  //     }
  //   );
  // }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }



}
