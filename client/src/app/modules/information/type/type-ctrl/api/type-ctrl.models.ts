import { InfEntityAssociation } from 'app/core';
import { TreeviewItem } from 'ngx-treeview';


export interface TypeOptions { [key: number]: TreeviewItem };

// Class of this slice of store
export class TypeCtrl {
    pkTypedClass?: number; // pk of the typed DfhClass (e.g. 363 Geographical Place, NOT: 364 Geographical place type)
    items?: TreeviewItem[];
    loading?: boolean;
    error?: any;

    constructor(data?: TypeCtrl) {
        Object.assign(this, data);
    }
}
