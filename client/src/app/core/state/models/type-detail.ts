import { InfEntityAssociation } from '../../sdk';

export class TypeDetail {

    entityAssociation?: InfEntityAssociation;
    label?: string;
    pkUiContext?: number;
    isViewMode?= false;
    editing?= false;
    loading?= false;
    fkDomainEntity?: number;
    _typeCtrl?;

    constructor(data?: TypeDetail) {
        Object.assign(this, data);
    }

}
