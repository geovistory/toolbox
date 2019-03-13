import { ComQuery } from "app/core";

// Class of this slice of store
export class QueryDetail {
    loading?: boolean;
    error?: any;
    
    queryResults?: any[];
    loadedPages?: { [pageNr: string]: boolean };
    loadingPages?: { [pageNr: string]: boolean };
    fullCount?: number;

    comQuery?: ComQuery;
    tabTitle?: string;

    // Layout
    showRightArea?: boolean;

    constructor(data?: QueryDetail) {
        Object.assign(this, data);
    }
}
