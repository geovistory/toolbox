// Class of this slice of store
export class QueryList implements QueryList {
    items?: {};
    loading?: boolean;
    error?: any;

    constructor(data?: QueryList) {
        Object.assign(this, data);
    }
}
