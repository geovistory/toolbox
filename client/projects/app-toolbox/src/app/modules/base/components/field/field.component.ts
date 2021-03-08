import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActiveProjectPipesService, Field, InformationPipesService, SchemaSelectorsService, Subfield } from '@kleiolab/lib-queries';
import { InfActions } from '@kleiolab/lib-redux';
import { GvSubfieldPageScope } from '@kleiolab/lib-sdk-lb4';
import { combineLatestOrEmpty } from '@kleiolab/lib-utils';
import { sum } from 'd3';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { first, map, switchMap, takeUntil } from 'rxjs/operators';
import { isValueObjectSubfield, subfieldToSubfieldId } from '../../base.helpers';
import { PaginationService } from '../../services/pagination.service';
import { TimeSpanService } from '../../services/time-span.service';
import { AddDialogComponent, AddDialogData } from '../add-dialog/add-dialog.component';
import { ChooseClassDialogComponent, ChooseClassDialogData } from '../choose-class-dialog/choose-class-dialog.component';
import { PropertiesTreeService } from '../properties-tree/properties-tree.service';


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
  @Input() treeControl: NestedTreeControl<Field>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>


  // listsWithCounts$: Observable<SubfieldWithItemCount[]>
  showAddButton$
  itemsCount$: Observable<number>;
  scope$: Observable<GvSubfieldPageScope>;

  constructor(
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public p: ActiveProjectService,
    public s: SchemaSelectorsService,
    public ap: ActiveProjectPipesService,
    public inf: InfActions,
    public dialog: MatDialog,
    private timeSpan: TimeSpanService,
    private pag: PaginationService
  ) {
    this.scope$ = this.ap.pkProject$.pipe(map(pkProject => {
      return { inProject: pkProject }
    }))
  }


  getKey(_, item) {
    return _;
  }

  ngOnInit() {
    if (this.fieldDefinition.isSpecialField === 'time-span') {
      this.itemsCount$ = of(1);
    } else {
      this.itemsCount$ = this.scope$.pipe(
        switchMap((scope) => {
          return combineLatestOrEmpty(
            this.fieldDefinition.listDefinitions.map(
              subfield => this.s.inf$.statement$.pagination$
                .pipeCount(subfieldToSubfieldId(subfield, this.pkEntity, scope)),
            )
          ).pipe(
            map(counts => sum(counts))
          )
        })
      )
    }

    // const limit = temporalEntityListDefaultLimit
    // const offset = temporalEntityListDefaultPageIndex
    // /**
    //  * Trigger loading from REST API
    //  */
    // this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
    //   this.fieldDefinition.listDefinitions.forEach(l => {
    //     if (l.listType.temporalEntity) {
    //       this.pag.temporalEntity.addPageLoader(pkProject, l, this.pkEntity, limit, offset, this.destroy$)
    //     }
    //     else if (l.listType.entityPreview) {
    //       this.pag.statements.addPageLoader(pkProject, l, this.pkEntity, limit, offset, this.destroy$)
    //     }
    //   })

    /**
     * Pipe data from redux store
     */
    if (this.fieldDefinition.isSpecialField !== 'has-type') {

      //   this.listsWithCounts$ = combineLatest(this.fieldDefinition.listDefinitions.map(l => {
      //     let obs$: Observable<number>;
      //     if (l.listType.temporalEntity || l.listType.entityPreview) {
      //       obs$ = this.p.inf$.statement$.pagination$.pipeCount(subfieldToSubfieldId(l, this.pkEntity, { inProject: pkProject }))
      //     } else {
      //       obs$ = this.i.pipeListLength(l, this.pkEntity)
      //     }
      //     return obs$.pipe(
      //       map((itemsCount) => ({ ...l, itemsCount }))
      //     )
      //   })).pipe(
      //     map(lists => lists.filter((list: SubfieldWithItemCount) => list.itemsCount > 0)),
      //     shareReplay({ refCount: true, bufferSize: 1 }),
      //   )

      //   this.itemsCount$ = this.listsWithCounts$.pipe(map((ls) => sum(ls.map((l) => l.itemsCount))))


      this.showAddButton$ = combineLatest(this.itemsCount$, this.readonly$)
        .pipe(map(([n, r]) => {
          if (r) return false;

          if (this.fieldDefinition.targetMaxQuantity === -1) return true;
          if (this.fieldDefinition.targetMaxQuantity <= n) return false
          if (this.fieldDefinition.isSpecialField === 'time-span' && 1 <= n) return false
          return true;
        }))
    }
    // else {
    //   this.itemsCount$ = this.i.pipeTypeOfEntity(this.pkEntity, this.fieldDefinition.property.pkProperty, this.fieldDefinition.isOutgoing).pipe(
    //     map(hasTypeStatement => hasTypeStatement ? 1 : 0)
    //   )
    // }

    // })
  }

  addClick() {
    if (this.fieldDefinition.isSpecialField === 'time-span') {
      this.i.pipeItemTimeSpan(this.pkEntity).pipe(first(), takeUntil(this.destroy$)).subscribe(item => {
        // TODO
        // this.timeSpan.openModal(item, this.pkEntity)
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
      height: 'calc(100% - 30px)',
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
