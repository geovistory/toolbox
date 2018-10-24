import { EntityAssociationDetail } from './entity-association-detail';


export class EntityAssociationList  {
    [key: string]: EntityAssociationDetail;

    constructor(data?: EntityAssociationList) {
        Object.assign(this, data);
    }
}
