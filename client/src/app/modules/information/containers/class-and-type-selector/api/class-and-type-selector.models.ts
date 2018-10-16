import { TreeviewItem } from 'ngx-treeview';

// Class of this slice of store
export class ClassAndTypeSelector implements ClassAndTypeSelector {
    items?: TreeviewItem[];
    loading?: boolean;
    error?: any;

    constructor(data?: ClassAndTypeSelector) {
        Object.assign(this, data);
    }
}
