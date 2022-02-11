import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AddEntityOrValueDialogComponent, AddEntityOrValueDialogData, CreateEntityEvent } from '../components/add-entity-or-value-dialog/add-entity-or-value-dialog.component';
import { AddStatementDialogComponent, AddStatementDialogData } from '../components/add-statement-dialog/add-statement-dialog.component';

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

}
