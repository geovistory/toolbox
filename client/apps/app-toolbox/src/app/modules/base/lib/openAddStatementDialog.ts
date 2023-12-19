import { MatDialog } from '@angular/material/dialog';
import { AddStatementDialogComponent, type AddStatementDialogData } from '../components/add-statement-dialog/add-statement-dialog.component';

/**
 * open add statement dialog
 * Returns an observable that emits the added statement
 */



export function openAddStatementDialog(dialog: MatDialog, config: AddStatementDialogData) {
    dialog.open<AddStatementDialogComponent, AddStatementDialogData>(
        AddStatementDialogComponent,
        {
            height: 'calc(100% - 30px)',
            width: config.showAddList ? '980px' : '500px',
            maxWidth: '100%',
            panelClass: 'gv-no-padding',
            data: config
        });
}
