import { Component, Input, OnInit } from '@angular/core';
import { InfActions } from 'app/core/inf/inf.actions';
import { NestedTreeControl } from '../../../../../../node_modules/@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '../../../../../../node_modules/@angular/material';
import { sum } from '../../../../../../node_modules/ramda';
import { combineLatest, Observable, Subject } from '../../../../../../node_modules/rxjs';
import { first, map, shareReplay, takeUntil } from '../../../../../../node_modules/rxjs/operators';
import { ActiveProjectService, SysConfig } from '../../../../core';
import { InformationPipesService } from '../../services/information-pipes.service';
import { PaginationService } from '../../services/pagination.service';
import { TimeSpanService } from '../../services/time-span.service';
import { ChooseClassDialogComponent, ChooseClassDialogData } from '../choose-class-dialog/choose-class-dialog.component';
import { FieldDefinition, ListDefinition, ListType } from '../properties-tree/properties-tree.models';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { createPaginateBy, temporalEntityListDefaultLimit, temporalEntityListDefaultPageIndex } from '../temporal-entity-list/temporal-entity-list.component';
import { AddDialogComponent, AddDialogData } from '../add-dialog/add-dialog.component';
import { AddOrCreateEntityDialogData, AddOrCreateEntityDialogComponent, CreateOrAddEntityEvent } from 'app/modules/base/components/add-or-create-entity-dialog/add-or-create-entity-dialog.component';

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
  // @Input() appContext: number
  @Input() treeControl: NestedTreeControl<FieldDefinition>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>

  listsWithCounts$: Observable<ListDefinitionWithItemCount[]>
  showAddButton$
  itemsCount$: Observable<number>;

  constructor(
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public p: ActiveProjectService,
    public inf: InfActions,
    public dialog: MatDialog,
    private timeSpan: TimeSpanService,
    private pag: PaginationService
  ) { }

  /**
   * returns a unique key for each list definition,
   * used by angular *ngFor directive to track items in DOM
   */
  getKey(index, item: ListDefinitionWithItemCount) {
    return item.listType + item.fkClassField + item.property.pkProperty + item.sourceClass + item.targetClass
  }

  ngOnInit() {
    const limit = temporalEntityListDefaultLimit
    const offset = temporalEntityListDefaultPageIndex
    /**
     * Trigger loading of statement lists
     */
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.fieldDefinition.listDefinitions.forEach(l => {
        if (l.listType === 'temporal-entity') {
          this.pag.temporalEntity.addPageLoader(pkProject, l, this.pkEntity, limit, offset, this.destroy$)
        }
        else if (l.listType === 'entity-preview') {
          this.pag.statements.addPageLoader(pkProject, l, this.pkEntity, limit, offset, this.destroy$)
        }
      })
    })


    if (this.fieldDefinition.listType !== 'has-type') {

      this.listsWithCounts$ = combineLatest(this.fieldDefinition.listDefinitions.map(l => {
        let obs$: Observable<number>;
        if (l.listType === 'temporal-entity' || l.listType === 'entity-preview') {
          obs$ = this.p.inf$.statement$.pagination$.pipeCount(createPaginateBy(l, this.pkEntity))
        } else {
          obs$ = this.i.pipeListLength(l, this.pkEntity)
        }
        return obs$.pipe(
          map((itemsCount) => ({ ...l, itemsCount }))
        )
      })).pipe(
        map(lists => lists.filter((list: ListDefinitionWithItemCount) => list.itemsCount > 0)),
        shareReplay({ refCount: true, bufferSize: 1 }),
      )

      this.itemsCount$ = this.listsWithCounts$.pipe(map((ls) => sum(ls.map((l) => l.itemsCount))))


      this.showAddButton$ = combineLatest(this.itemsCount$, this.readonly$)
        .pipe(map(([n, r]) => {
          if (r) return false;

          if (this.fieldDefinition.targetMaxQuantity === -1) return true;
          if (this.fieldDefinition.targetMaxQuantity <= n) return false
          if (this.fieldDefinition.listType == 'time-span' && 1 <= n) return false
          return true;
        }))
    } else {
      this.itemsCount$ = this.i.pipeTypeOfEntity(this.pkEntity, this.fieldDefinition.property.pkProperty).pipe(
        map(hasTypeRole => hasTypeRole ? 1 : 0)
      )
    }

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
    // More than one target class?
    else if (this.fieldDefinition.targetClasses && this.fieldDefinition.targetClasses.length > 1) {

      // Let the user select target class first

      const data: ChooseClassDialogData = {
        pkClasses: this.fieldDefinition.targetClasses,
        title: 'Choose a class'
      }
      this.dialog.open(ChooseClassDialogComponent, { data })
        .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(chosenClass => {
          if (chosenClass) {

            // open add dialog

            const listDef = this.fieldDefinition.listDefinitions.find(l => l.targetClass === chosenClass)
            this.openAddDialog(listDef);
          }
        });
    }
    // Only one target class!
    else {

      // open add dialog

      const listDef = this.fieldDefinition.listDefinitions[0];
      this.openAddDialog(listDef);
    }
  }

  private openAddDialog(listDef: ListDefinition) {
    const isValueLike = ['appellation', 'language', 'place', 'text-property', 'lang-string']
      .includes(listDef.listType);
    const showAddList = (!isValueLike && !listDef.identityDefiningForTarget)
    const data: AddDialogData = {
      listDefinition: listDef,
      pkEntity: this.pkEntity
    };
    const config: MatDialogConfig = {
      height: isValueLike ? '50%' : '100%',
      width: showAddList ? '980px' : '500px',
      maxWidth: '100%',
      data,
    }
    // if (!isValueLike) config.height = 'calc(100% - 30px)'
    this.dialog.open(AddDialogComponent, config);
  }




  toggle() {
    if (this.treeControl) {
      this.treeControl.isExpanded(this.fieldDefinition) ?
        this.treeControl.collapse(this.fieldDefinition) :
        this.treeControl.expand(this.fieldDefinition);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
