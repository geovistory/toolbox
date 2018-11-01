import { PropertyField } from './property-field';


export class PropertyFieldList  {
    [key: string]: PropertyField;

    constructor(data?: PropertyFieldList) {
        Object.assign(this, data);
    }
}
