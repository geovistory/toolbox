import { Component, Input, OnInit } from '@angular/core';
import { InfActions } from "@kleiolab/lib-redux";
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { sum } from 'ramda';
import { combineLatest, Observable, Subject } from 'rxjs';
import { first, map, shareReplay, takeUntil } from 'rxjs/operators';
import { ActiveProjectService } from "projects/app-toolbox/src/app/core/active-project/active-project.service";
import { isValueObjectSubfield } from '../../base.helpers';
import { InformationPipesService } from "@kleiolab/lib-queries";
import { PaginationService } from '../../services/pagination.service';
import { AddDialogComponent, AddDialogData } from '../add-dialog/add-dialog.component';
import { ChooseClassDialogComponent, ChooseClassDialogData } from '../choose-class-dialog/choose-class-dialog.component';
import { SubfieldType } from "@kleiolab/lib-queries";
import { Subfield } from "@kleiolab/lib-queries";
import { Field } from "@kleiolab/lib-queries";
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';
import { temporalEntityListDefaultPageIndex } from "../../base.helpers";

import { temporalEntityListDefaultLimit } from "../../base.helpers";
import { createPaginateBy } from "../../base.helpers";
import { TimeSpanService } from '../../services/time-span.service';

interface SubfieldWithItemCount extends Subfield {
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

  @Input() fieldDefinition: Field
  // @Input() appContext: number
  @Input() treeControl: NestedTreeControl<Field>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>

  listsWithCounts$: Observable<SubfieldWithItemCount[]>
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


  getKey(_, item) {
    return _;
  }

  ngOnInit() {
    const limit = temporalEntityListDefaultLimit
    const offset = temporalEntityListDefaultPageIndex
    /**
     * Trigger loading of statement lists
     */
    this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
      this.fieldDefinition.listDefinitions.forEach(l => {
        if (l.listType.temporalEntity) {
          this.pag.temporalEntity.addPageLoader(pkProject, l, this.pkEntity, limit, offset, this.destroy$)
        }
        else if (l.listType.entityPreview) {
          this.pag.statements.addPageLoader(pkProject, l, this.pkEntity, limit, offset, this.destroy$)
        }
      })
    })

    if (this.fieldDefinition.isSpecialField !== 'has-type') {

      this.listsWithCounts$ = combineLatest(this.fieldDefinition.listDefinitions.map(l => {
        let obs$: Observable<number>;
        if (l.listType.temporalEntity || l.listType.entityPreview) {
          obs$ = this.p.inf$.statement$.pagination$.pipeCount(createPaginateBy(l, this.pkEntity))
        } else {
          obs$ = this.i.pipeListLength(l, this.pkEntity)
        }
        return obs$.pipe(
          map((itemsCount) => ({ ...l, itemsCount }))
        )
      })).pipe(
        map(lists => lists.filter((list: SubfieldWithItemCount) => list.itemsCount > 0)),
        shareReplay({ refCount: true, bufferSize: 1 }),
      )

      this.itemsCount$ = this.listsWithCounts$.pipe(map((ls) => sum(ls.map((l) => l.itemsCount))))


      this.showAddButton$ = combineLatest(this.itemsCount$, this.readonly$)
        .pipe(map(([n, r]) => {
          if (r) return false;

          if (this.fieldDefinition.targetMaxQuantity === -1) return true;
          if (this.fieldDefinition.targetMaxQuantity <= n) return false
          if (this.fieldDefinition.isSpecialField === 'time-span' && 1 <= n) return false
          return true;
        }))
    } else {
      this.itemsCount$ = this.i.pipeTypeOfEntity(this.pkEntity, this.fieldDefinition.property.pkProperty, this.fieldDefinition.isOutgoing).pipe(
        map(hasTypeStatement => hasTypeStatement ? 1 : 0)
      )
    }

  }

  addClick() {
    if (this.fieldDefinition.isSpecialField === 'time-span') {
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

  private openAddDialog(listDef: Subfield) {
    const isValueLike = isValueObjectSubfield(listDef.listType);
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
