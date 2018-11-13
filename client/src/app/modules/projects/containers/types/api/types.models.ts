import { DfhClass, InfNamespace, InfPersistentItem } from 'app/core';
import { TypeEditFormI } from '../../type-edit-form/api/type-edit-form.models';
import { CreateOrAddPeIt } from 'app/modules/information/containers/create-or-add-pe-it/api/create-or-add-pe-it.models';


// Class of this slice of store
export class Types  {
    items?: {};
    add?: CreateOrAddPeIt;
    edit?: boolean | TypeEditFormI;
    loading?: boolean;
    class?: DfhClass;
    error?: any;
    namespace?: InfNamespace;

    constructor(data?: Types) {
        Object.assign(this, data);
    }
}
