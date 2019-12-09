import { Component, Input, OnInit } from '@angular/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { NestedTreeControl } from '../../../../../../node_modules/@angular/cdk/tree';
import { MatDialog } from '../../../../../../node_modules/@angular/material';
import { sum } from '../../../../../../node_modules/ramda';
import { combineLatest, Observable, Subject } from '../../../../../../node_modules/rxjs';
import { filter, first, map, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService } from '../../../../core';
import { InformationPipesService } from '../../new-services/information-pipes.service';
import { TimeSpanService } from '../../new-services/time-span.service';
import { ChooseClassDialogComponent, ChooseClassDialogData } from '../choose-class-dialog/choose-class-dialog.component';
import { FieldDefinition, ListDefinition, ListType } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { createPaginateBy, temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../temporal-entity-list/temporal-entity-list.component';

interface ListDefinitionWithItemCount extends ListDefinition {
  itemsCount: number
}

@Component({
  selector: 'gv-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.scss']
})
export class FieldComponent implements OnInit {

  destroy$ = new Subject<boolean>();

  @Input() pkEntity: number;

  @Input() fieldDefinition: FieldDefinition
  @Input() appContext: number
  @Input() treeControl: NestedTreeControl<FieldDefinition>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>

  listsWithCounts$: Observable<ListDefinitionWithItemCount[]>
  showAddButton$
  itemsCount$;

  constructor(
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public p: ActiveProjectService,
    public inf: InfActions,
    public dialog: MatDialog,
    private timeSpan: TimeSpanService,
  ) { }

  ngOnInit() {
    const limit = temporalEntityListDefaultLimit
    const offset = temporalEntityListDefaultPageIndex
    /**
     * Trigger loading of temporal entity lists
     */
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.fieldDefinition.listDefinitions.forEach(l => {
        if (l.listType === 'temporal-entity') {
          const paginateBy = createPaginateBy(l, this.pkEntity)
          this.p.inf$.role$.pagination$.pipePageLoadNeeded(paginateBy, limit, offset).pipe(
            filter(loadNeeded => loadNeeded === true),
            takeUntil(this.destroy$)
          ).subscribe(() => {
            this.inf.temporal_entity.loadPaginatedList(
              pkProject,
              this.pkEntity,
              l.pkProperty,
              l.targetClass,
              l.isOutgoing,
              limit,
              offset
            )
          })
        }
      })
    })


    this.listsWithCounts$ = combineLatest(this.fieldDefinition.listDefinitions.map(l => {
      let obs$: Observable<number>;
      if (l.listType === 'temporal-entity') {
        obs$ = this.p.inf$.role$.pagination$.pipeCount(createPaginateBy(l, this.pkEntity))
      } else {
        obs$ = this.i.pipeListLength(l, this.pkEntity)
      }
      return obs$.pipe(
        map((itemsCount) => ({ ...l, itemsCount }))
      )
    })).pipe(
      map(lists => lists.filter((list: ListDefinitionWithItemCount) => list.itemsCount > 0))
    )
    this.listsWithCounts$.pipe(takeUntil(this.destroy$)).subscribe()

    this.itemsCount$ = this.listsWithCounts$.pipe(map((ls) => sum(ls.map((l) => l.itemsCount))))

    this.showAddButton$ = combineLatest(this.itemsCount$, this.readonly$)
      .pipe(map(([n, r]) => {
        if (r) return false;

        if (this.fieldDefinition.targetMaxQuantity === -1) return true;
        if (this.fieldDefinition.targetMaxQuantity <= n) return false
        if (this.fieldDefinition.listType == 'time-span' && 1 <= n) return false
        return true;
      }))


  }

  is = (node: ListDefinition, type: ListType) => {
    return node.listType === type
  };

  addClick() {
    if (this.fieldDefinition.listType === 'time-span') {
      this.i.pipeItemTimeSpan(this.pkEntity).pipe(first(), takeUntil(this.destroy$)).subscribe(item => {
        this.timeSpan.openModal(item, this.pkEntity)
      })
    }
    else if (this.fieldDefinition.targetClasses && this.fieldDefinition.targetClasses.length > 1) {
      // show a select list
      const data: ChooseClassDialogData = {
        pkClasses: this.fieldDefinition.targetClasses,
        title: 'Choose a class'
      }
      this.dialog.open(ChooseClassDialogComponent, { data })
        .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(chosenClass => {
          if (chosenClass) {
            const listDef = this.fieldDefinition.listDefinitions.find(l => l.targetClass === chosenClass)
            this.t.showControl$.next(listDef)
          }
        });
    }
    else {
      this.t.showControl$.next(this.fieldDefinition.listDefinitions[0])
    }
  }

  editTimeSpan() {

  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
