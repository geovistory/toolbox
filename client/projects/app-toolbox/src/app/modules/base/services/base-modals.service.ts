import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AddEntityDialogComponent, AddEntityDialogData, CreateEntityEvent } from '../components/add-entity-dialog/add-entity-dialog.component';
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
  openAddEntityDialog(config: AddEntityDialogData) {
    const observable = new Subject<CreateEntityEvent>();

    // this.ngRedux.dispatch(this.actions.openAddForm(config));

    this.dialog.open<AddEntityDialogComponent, AddEntityDialogData, CreateEntityEvent>(
      AddEntityDialogComponent,
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
        width: config.valueTarget ? '500px' : '980px',
        maxWidth: '100%',
        panelClass: 'gv-no-padding',
        data: config
      })
  }

}
