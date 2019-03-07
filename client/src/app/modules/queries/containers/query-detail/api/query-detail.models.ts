// Class of this slice of store
export class QueryDetail {
    items?: any[];
    loading?: boolean;
    error?: any;

    loadedPages?: { [pageNr: string]: boolean };
    loadingPages?: { [pageNr: string]: boolean };
    fullCount?: number;

    // Layout
    showRightArea?: boolean;

    constructor(data?: QueryDetail) {
        Object.assign(this, data);
    }
}
