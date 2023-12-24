import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Field } from '@kleiolab/lib-redux';
import { GvFieldSourceEntity, StatementWithTarget } from '@kleiolab/lib-sdk-lb4';
import { isValueObjectSubfield } from '../base.helpers';
import { AddStatementDialogComponent, type AddStatementDialogData } from '../../../components/data/add-statement-dialog/add-statement-dialog.component';

/**
 *
 */



export function openAddStatementDialogFromField(dialog: MatDialog, source: GvFieldSourceEntity, field: Field, targetClass: number, toBeReplaced?: StatementWithTarget) {
    const targetTyp = field.targets[targetClass];
    const isValue = isValueObjectSubfield(targetTyp.viewType);
    const showAddList = (!isValue && !field.identityDefiningForTarget);
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
    };
    return dialog.open<AddStatementDialogComponent, AddStatementDialogData, boolean>(AddStatementDialogComponent, config);
}
