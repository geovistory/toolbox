import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Field } from '@kleiolab/lib-queries';
import { GvFieldSourceEntity, StatementWithTarget } from '@kleiolab/lib-sdk-lb4/public-api';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { isValueObjectSubfield } from '../base.helpers';
import { AddEntityOrValueDialogComponent, AddEntityOrValueDialogData, CreateEntityEvent } from '../components/add-entity-or-value-dialog/add-entity-or-value-dialog.component';
import { AddStatementDialogComponent, AddStatementDialogData } from '../components/add-statement-dialog/add-statement-dialog.component';
import { SelectPlatformVocabItemDialogComponent, SelectPlatformVocabItemDialogData } from '../components/select-platform-vocab-item-dialog/select-platform-vocab-item-dialog.component';
import { SelectTypeDialogComponent, SelectTypeDialogData } from '../components/select-type-dialog/select-type-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class BaseModalsService {

  constructor(
    private dialog: MatDialog,
  ) { }

  /**
   * Returns an observable that emits the added entity
   */
  openAddEntityDialog(config: AddEntityOrValueDialogData) {
    const observable = new Subject<CreateEntityEvent>();

    // this.ngRedux.dispatch(this.actions.openAddForm(config));

    this.dialog.open<AddEntityOrValueDialogComponent, AddEntityOrValueDialogData, CreateEntityEvent>(
      AddEntityOrValueDialogComponent,
      {
        // height: '90%',
        // width: '90%',
        height: 'calc(100% - 30px)',
        width: '980px',
        maxWidth: '100%',
        panelClass: 'gv-no-padding',
        data: config
      })
      .afterClosed().pipe(first()).subscribe(result => {
        // this.ngRedux.dispatch(this.actions.closeAddForm());
        if (result) observable.next(result)
      });

    return observable;
  }


  /**
   * Returns an observable that emits the added statement
   */
  openAddStatementDialog(config: AddStatementDialogData) {
    this.dialog.open<AddStatementDialogComponent, AddStatementDialogData>(
      AddStatementDialogComponent,
      {
        height: 'calc(100% - 30px)',
        width: config.showAddList ? '980px' : '500px',
        maxWidth: '100%',
        panelClass: 'gv-no-padding',
        data: config
      })
  }

  /**
   * Open a dialog to creat a statement with a platform vocabulary item as target.
   * If you provide an originalStatement, this will be replaced
   * @param source
   * @param field
   * @param targetClass
   * @param originalStatement
   */
  openSelectPlatformVocabItem(source: GvFieldSourceEntity, field: Field, targetClass: number, originalStatement?: StatementWithTarget) {
    const data: SelectPlatformVocabItemDialogData = {
      field,
      source,
      targetClass,
      originalStatement
    }
    return this.dialog.open<SelectPlatformVocabItemDialogComponent, SelectPlatformVocabItemDialogData, boolean>(SelectPlatformVocabItemDialogComponent, { data })
  }

  /**
 * Open a dialog to creat a has type statement with a type from the project as target.
 * If you provide an originalStatement, this will be replaced
 * @param source
 * @param field
 * @param targetClass
 * @param originalStatement
 */
  openAddHasType(source: GvFieldSourceEntity, field: Field, targetClass: number, originalStatement?: StatementWithTarget) {
    const data: SelectTypeDialogData = {
      field,
      source,
      targetClass,
      originalStatement
    }
    return this.dialog.open<SelectTypeDialogComponent, SelectTypeDialogData, boolean>(SelectTypeDialogComponent, { data })
  }

  openAddStatementDialogFromField(source: GvFieldSourceEntity, field: Field, targetClass: number, toBeReplaced?: StatementWithTarget) {
    const targetTyp = field.targets[targetClass]
    const isValue = isValueObjectSubfield(targetTyp.viewType);
    const showAddList = (!isValue && !field.identityDefiningForTarget)
    const data: AddStatementDialogData = {
      field: field,
      targetClass,
      showAddList,
      source: source,
      hiddenProperty: field.property,
      toBeReplaced
    };
    const config: MatDialogConfig<AddStatementDialogData> = {
      height: 'calc(100% - 30px)',
      width: !showAddList ? '500px' : '980px',
      maxWidth: '100%',
      data,
      panelClass: 'gv-no-padding',
    }
    return this.dialog.open<AddStatementDialogComponent, AddStatementDialogData, boolean>(AddStatementDialogComponent, config);
  }

}
