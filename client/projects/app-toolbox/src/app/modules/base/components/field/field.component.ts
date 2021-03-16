import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ActiveProjectPipesService, Field, InformationPipesService, SchemaSelectorsService, Subfield } from '@kleiolab/lib-queries';
import { InfActions } from '@kleiolab/lib-redux';
import { GvFieldPageScope } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, switchMap, takeUntil } from 'rxjs/operators';
import { fieldToFieldId, isValueObjectSubfield } from '../../base.helpers';
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
  @Input() field: Field
  @Input() treeControl: NestedTreeControl<Field>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>


  // listsWithCounts$: Observable<SubfieldWithItemCount[]>
  showAddButton$
  itemsCount$: Observable<number>;
  scope$: Observable<GvFieldPageScope>;

  constructor(
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public p: ActiveProjectService,
    public s: SchemaSelectorsService,
    public ap: ActiveProjectPipesService,
    public inf: InfActions,
    public dialog: MatDialog,
  ) {
    this.scope$ = this.ap.pkProject$.pipe(map(pkProject => {
      return { inProject: pkProject }
    }))
  }


  getKey(_, item) {
    return _;
  }

  ngOnInit() {
    if (this.field.isSpecialField === 'time-span') {
      this.itemsCount$ = of(1);
    } else {
      this.itemsCount$ = this.scope$.pipe(
        switchMap(
          (scope) => this.s.inf$.statement$.pagination$
            .pipeCount(fieldToFieldId(this.field, this.pkEntity, scope))
        ),
        shareReplay({ refCount: true, bufferSize: 1 })
      )
    }

    // const limit = temporalEntityListDefaultLimit
    // const offset = temporalEntityListDefaultPageIndex
    // /**
    //  * Trigger loading from REST API
    //  */
    // this.p.pkProject$.pipe(first(), takeUntil(this.destroy$)).subscribe(pkProject => {
    //   this.field.listDefinitions.forEach(l => {
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
    if (this.field.isSpecialField !== 'has-type') {

      //   this.listsWithCounts$ = combineLatest(this.field.listDefinitions.map(l => {
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

          if (this.field.targetMaxQuantity === -1) return true;
          if (this.field.targetMaxQuantity <= n) return false
          if (this.field.isSpecialField === 'time-span' && 1 <= n) return false
          return true;
        }))
    }
    // else {
    //   this.itemsCount$ = this.i.pipeTypeOfEntity(this.pkEntity, this.field.property.pkProperty, this.field.isOutgoing).pipe(
    //     map(hasTypeStatement => hasTypeStatement ? 1 : 0)
    //   )
    // }

    // })
  }

  addClick() {
    if (this.field.isSpecialField === 'time-span') {
      // TODO
      // this.i.pipeItemTimeSpan(this.pkEntity).pipe(first(), takeUntil(this.destroy$)).subscribe(item => {
      //   // this.timeSpan.openModal(item, this.pkEntity)
      // })
    }
    // More than one target class?
    else if (this.field.targetClasses && this.field.targetClasses.length > 1) {

      // Let the user select target class first

      const data: ChooseClassDialogData = {
        pkClasses: this.field.targetClasses,
        title: 'Choose a class'
      }
      this.dialog.open(ChooseClassDialogComponent, { data })
        .afterClosed().pipe(takeUntil(this.destroy$)).subscribe(chosenClass => {
          if (chosenClass) {

            this.openAddDialog(this.field, chosenClass);
          }
        });
    }
    // Only one target class!
    else {

      const targetClass = this.field.targetClasses[0];
      this.openAddDialog(this.field, targetClass);
    }
  }

  private openAddDialog(field: Field, targetClass: number) {
    const targetTyp = field.targets[targetClass]
    const isValueLike = isValueObjectSubfield(targetTyp.listType);
    const showAddList = (!isValueLike && !field.identityDefiningForTarget)
    const data: AddDialogData = {
      field: field,
      targetClass,
      pkEntity: this.pkEntity
    };
    const config: MatDialogConfig = {
      height: 'calc(100% - 30px)',
      width: showAddList ? '980px' : '500px',
      maxWidth: '100%',
      data,
    }
    this.dialog.open(AddDialogComponent, config);
  }




  toggle() {
    if (this.treeControl) {
      this.treeControl.isExpanded(this.field) ?
        this.treeControl.collapse(this.field) :
        this.treeControl.expand(this.field);
    }
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

}
