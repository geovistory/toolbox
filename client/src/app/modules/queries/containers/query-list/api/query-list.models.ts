import { ComQuery } from 'app/core';

export interface ComQueryList { [key: string]: ComQuery }

// Class of this slice of store
export class QueryList implements QueryList {
    items?: ComQueryList;
    loading?: boolean;
    error?: any;

    constructor(data?: QueryList) {
        Object.assign(this, data);
    }
}
