import { DfhClass, InfNamespace, InfPersistentItem } from 'app/core';
import { TypeEditFormI } from '../../type-edit-form/api/type-edit-form.models';
import { CreateOrAddEntity } from 'app/modules/information/containers/create-or-add-entity/api/create-or-add-entity.models';


// Class of this slice of store
export class Types  {
    items?: {};
    add?: CreateOrAddEntity;
    edit?: boolean | TypeEditFormI;
    loading?: boolean;
    class?: DfhClass;
    error?: any;
    namespace?: InfNamespace;

    constructor(data?: Types) {
        Object.assign(this, data);
    }
}
