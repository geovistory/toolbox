
// Class of this slice of store
export class VisualDetail implements VisualDetail {
    queryResByVersion?: { [key: string]: any[] };
    queryResVersionLoading?: { [key: string]: boolean };

    pkEntity?:number; // pk entity of comVisual

    deleted?: boolean;

    error?: any;

    tabTitle?: string;

    // Layout
    showRightArea?: boolean;

    constructor(data?: VisualDetail) {
        Object.assign(this, data);
    }
}