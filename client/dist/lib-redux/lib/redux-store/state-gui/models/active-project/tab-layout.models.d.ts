export declare type TabLayoutMode = 'left-only' | 'right-only' | 'both';
export declare class TabBase {
    pkEntity?: number;
    tabTitle?: string;
    tabTooltip?: string;
    loading?: boolean;
    layoutMode?: TabLayoutMode;
    constructor(data?: TabBase);
}
