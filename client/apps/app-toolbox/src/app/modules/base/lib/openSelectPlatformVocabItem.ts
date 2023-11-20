import { MatDialog } from '@angular/material/dialog';
import { Field } from '@kleiolab/lib-redux';
import { GvFieldSourceEntity, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { SelectPlatformVocabItemDialogComponent, type SelectPlatformVocabItemDialogData } from '../components/select-platform-vocab-item-dialog/select-platform-vocab-item-dialog.component';

/**
 * Open a dialog to creat a statement with a platform vocabulary item as target.
 * If you provide an originalStatement, this will be replaced
 * @param source
 * @param field
 * @param targetClass
 * @param originalStatement
 */



export function openSelectPlatformVocabItem(dialog: MatDialog, source: GvFieldSourceEntity, field: Field, targetClass: number, originalStatement?: StatementWithTarget) {
    const data: SelectPlatformVocabItemDialogData = {
        field,
        source,
        targetClass,
        originalStatement
    };
    return dialog.open<SelectPlatformVocabItemDialogComponent, SelectPlatformVocabItemDialogData, boolean>(SelectPlatformVocabItemDialogComponent, { data });
}
