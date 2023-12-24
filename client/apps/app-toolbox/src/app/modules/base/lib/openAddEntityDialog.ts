import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AddEntityOrValueDialogComponent, type AddEntityOrValueDialogData, type CreateEntityEvent } from '../../../components/data/add-entity-or-value-dialog/add-entity-or-value-dialog.component';

/**
  * Open the add entity dialog
  * Returns an observable that emits the added entity
  */
export function openAddEntityDialog(dialog: MatDialog, config: AddEntityOrValueDialogData) {
  const observable = new Subject<CreateEntityEvent>();


  dialog.open<AddEntityOrValueDialogComponent, AddEntityOrValueDialogData, CreateEntityEvent>(
    AddEntityOrValueDialogComponent,
    {
      height: 'calc(100% - 30px)',
      width: '980px',
      maxWidth: '100%',
      panelClass: 'gv-no-padding',
      data: config
    })
    .afterClosed().pipe(first()).subscribe(result => {
      if (result) observable.next(result);
    });

  return observable;
}
