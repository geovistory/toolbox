import { PropertyField } from './role-set';


export class PropertyFieldList  {
    [key: string]: PropertyField;

    constructor(data?: PropertyFieldList) {
        Object.assign(this, data);
    }
}
