import { SysClassField } from 'app/core';

// Class of this slice of store
export class ClassFieldList implements ClassFieldList {
    items?:  { [key: string]: SysClassField};
    loading?: boolean;
    error?: any;

    constructor(data?: ClassFieldList) {
        Object.assign(this, data);
    }
}
