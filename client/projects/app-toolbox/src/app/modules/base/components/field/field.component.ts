import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActiveProjectPipesService, Field, InformationPipesService, SchemaSelectorsService, Subfield } from '@kleiolab/lib-queries';
import { InfActions } from '@kleiolab/lib-redux';
import { GvFieldPageScope, GvFieldSourceEntity } from '@kleiolab/lib-sdk-lb4';
import { ActiveProjectService } from 'projects/app-toolbox/src/app/core/active-project/active-project.service';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, shareReplay, takeUntil } from 'rxjs/operators';
import { fieldToFieldId, isValueObjectSubfield } from '../../base.helpers';
import { AddDialogComponent, AddDialogData } from '../add-dialog/add-dialog.component';
import { ChooseClassDialogComponent, ChooseClassDialogData } from '../choose-class-dialog/choose-class-dialog.component';
import { getFormTargetClasses } from '../form-field-header/form-field-header.component';
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

  @Input() source: GvFieldSourceEntity;
  @Input() field: Field
  @Input() treeControl: NestedTreeControl<Field>;
  @Input() readonly$: Observable<boolean>
  @Input() showOntoInfo$: Observable<boolean>
  @Input() scope: GvFieldPageScope;


  // listsWithCounts$: Observable<SubfieldWithItemCount[]>
  showAddButton$
  itemsCount$: Observable<number>;

  constructor(
    public t: PropertiesTreeService,
    public i: InformationPipesService,
    public p: ActiveProjectService,
    public s: SchemaSelectorsService,
    public ap: ActiveProjectPipesService,
    public inf: InfActions,
    public dialog: MatDialog,
  ) {

  }


  getKey(_, item) {
    return _;
  }

  ngOnInit() {

    const errors: string[] = []
    if (!this.field) errors.push('@Input() field is required.');
    if (!this.source) errors.push('@Input() pkEntity is required.');
    if (!this.scope) errors.push('@Input() scope is required.');
    if (!this.showOntoInfo$) errors.push('@Input() showOntoInfo$ is required.');
    if (!this.readonly$) errors.push('@Input() readonly$ is required.');
    if (!this.treeControl) errors.push('@Input() treeControl is required.');
    if (errors.length) throw new Error(errors.join('\n'));


    if (this.field.isSpecialField === 'time-span') {
      this.itemsCount$ = of(1);
    } else {
      this.itemsCount$ = this.s.inf$.statement$.pagination$
        .pipeCount(fieldToFieldId(this.field, this.source, this.scope)).pipe(
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


      this.showAddButton$ = combineLatest(this.itemsCount$, this.readonly$)
        .pipe(map(([n, r]) => {
          if (r) return false;

          if (this.field.targetMaxQuantity === -1) return true;
          if (this.field.targetMaxQuantity <= n) return false
          if (this.field.isSpecialField === 'time-span' && 1 <= n) return false
          return true;
        }))
    }

  }

  addClick() {
    if (this.field.isSpecialField === 'time-span') {
      return;
    }
    const targetClasses = getFormTargetClasses(this.field)
    // More than one target class?
    if (targetClasses.length > 1) {

      // Let the user select target class first

      const data: ChooseClassDialogData = {
        pkClasses: targetClasses.map(t => t.targetClass),
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

      const targetClass = targetClasses[0].targetClass;
      this.openAddDialog(this.field, targetClass);
    }
  }

  private openAddDialog(field: Field, targetClass: number) {
    const targetTyp = field.targets[targetClass]
    const isValueLike = isValueObjectSubfield(targetTyp.viewType);
    const showAddList = (!isValueLike && !field.identityDefiningForTarget)
    const data: AddDialogData = {
      field: field,
      targetClass,
      source: this.source
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
