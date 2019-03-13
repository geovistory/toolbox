import { ComQuery } from 'app/core';

// Class of this slice of store
export class QueryList implements QueryList {
    items?: { [key: string]: ComQuery };
    loading?: boolean;
    error?: any;

    constructor(data?: QueryList) {
        Object.assign(this, data);
    }
}
