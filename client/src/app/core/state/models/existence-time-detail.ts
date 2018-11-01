import { ExistenceTimeEdit } from './existence-time-edit';
import { Field } from './field';
import { PropertyField } from './property-field';
import { PropertyFieldList } from './property-field-list';
import { CollapsedExpanded } from './types';



export class ExistenceTimeDetail extends Field {

    readonly type? = 'ExistenceTimeDetail';

    _fields?: PropertyFieldList;

    // records
    roles?= [];

    // gui
    pkUiContext?: number;
    toggle?= 'expanded' as CollapsedExpanded;
    outgoingPropertyFields?: PropertyField[];

    // for edit (form that controls consistency between different time-roles)
    _existenceTime_edit?: ExistenceTimeEdit;

    constructor(data?: ExistenceTimeDetail) {
        super()
        Object.assign(this, data);
    }


}
