import { InfEntityAssociation, InfPersistentItem } from '../../sdk';

export class TypeDetail {

    entityAssociation?: InfEntityAssociation;
    label?: string;
    editing? = false;

    constructor(data?: TypeDetail) {
        Object.assign(this, data);
    }

}
