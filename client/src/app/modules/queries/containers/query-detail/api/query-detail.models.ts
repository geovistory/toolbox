import { ProQuery } from 'app/core';

export type FileType = 'json' | 'csv';

// Class of this slice of store
export class QueryDetail {
    loading?: boolean;
    error?: any;

    queryResults?: any[];
    loadedPages?: { [pageNr: string]: boolean };
    loadingPages?: { [pageNr: string]: boolean };
    fullCount?: number;

    comQuery?: ProQuery;
    tabTitle?: string;

    // Layout
    showRightArea?: boolean;

    deleted?: boolean;

    downloadLoading?: boolean;
    downloadError?: boolean;

    constructor(data?: QueryDetail) {
        Object.assign(this, data);
    }
}
