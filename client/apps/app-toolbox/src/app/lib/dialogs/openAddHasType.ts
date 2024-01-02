import { MatDialog } from '@angular/material/dialog';
import { Field } from '@kleiolab/lib-redux';
import { GvFieldSourceEntity, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { SelectTypeDialogComponent, type SelectTypeDialogData } from '../../components/editor/select-type-dialog/select-type-dialog.component';

/**
* Open a dialog to creat a has type statement with a type from the project as target.
* If you provide an originalStatement, this will be replaced
* @param source
* @param field
* @param targetClass
* @param originalStatement
*/



export function openAddHasType(dialog: MatDialog, source: GvFieldSourceEntity, field: Field, targetClass: number, originalStatement?: StatementWithTarget) {
    const data: SelectTypeDialogData = {
        field,
        source,
        targetClass,
        originalStatement
    };
    return dialog.open<SelectTypeDialogComponent, SelectTypeDialogData, boolean>(SelectTypeDialogComponent, { data });
}
