export declare type RightPanelTab = 'linked-sources' | 'linked-digitals' | 'content-tree';
export interface PeItDetailList {
    [pk_entity: number]: EntityDetail;
}
export declare class EntityDetail {
    pkEntity?: number;
    /** Left Panel Visibility */
    showProperties?: boolean;
    showRightArea?: boolean;
    /** Right panel */
    rightPanelTabs?: RightPanelTab[];
    rightPanelActiveTab?: number;
    showHeader?: boolean;
    constructor(data?: EntityDetail);
}
