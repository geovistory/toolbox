import { InfEntityAssociation, InfPersistentItem } from '../../sdk';
import { TypeCtrl } from 'app/modules/information/type/type-ctrl/api/type-ctrl.models';

export class TypeDetail {

    entityAssociation?: InfEntityAssociation;
    label?: string;
    isViewMode?= false;
    editing?= false;
    loading?= false;
    fkDomainEntity?: number;
    _typeCtrl?: TypeCtrl;

    constructor(data?: TypeDetail) {
        Object.assign(this, data);
    }

}
