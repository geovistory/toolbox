import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { AddOrCreateEntityDialogData, CreateOrAddEntityEvent, AddOrCreateEntityDialogComponent } from '../components/add-or-create-entity-dialog/add-or-create-entity-dialog.component';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';

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
  openModalCreateOrAddEntity(config: AddOrCreateEntityDialogData) {
    const observable = new Subject<CreateOrAddEntityEvent>();

    // this.ngRedux.dispatch(this.actions.openAddForm(config));

    this.dialog.open<AddOrCreateEntityDialogComponent, AddOrCreateEntityDialogData, CreateOrAddEntityEvent>(
      AddOrCreateEntityDialogComponent,
      {
        // height: '90%',
        // width: '90%',
        height: 'calc(100% - 30px)',
        width: '980px',
        maxWidth: '100%',
        data: config
      })
      .afterClosed().pipe(first()).subscribe(result => {
        // this.ngRedux.dispatch(this.actions.closeAddForm());
        if (result) observable.next(result)
      });

    return observable;
  }

}
