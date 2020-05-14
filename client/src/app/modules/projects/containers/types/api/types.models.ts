import { DfhClass, DatNamespace, InfPersistentItem } from 'app/core';
import { TypeEditFormI } from '../../type-edit-form/api/type-edit-form.models';


// Class of this slice of store
export class Types  {
    items?: {};
    edit?: boolean | TypeEditFormI;
    loading?: boolean;
    error?: any;

    // title in the tab
    tabTitle?: string;

    constructor(data?: Types) {
        Object.assign(this, data);
    }
}
