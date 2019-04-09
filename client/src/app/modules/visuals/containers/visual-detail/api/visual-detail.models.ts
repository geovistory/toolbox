// Class of this slice of store
export class VisualDetail implements VisualDetail {
    queryResByVersion?: { [key: string]: any[] };
    queryResVersionLoading?: { [key: string]: boolean };

    error?: any;

    tabTitle?: string;

    // Layout
    showRightArea?: boolean;

    constructor(data?: VisualDetail) {
        Object.assign(this, data);
    }
}
