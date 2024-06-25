import { PanelTab } from '@kleiolab/lib-redux';



export interface TabBody<M> extends PanelTab<M> {
    panelId: number;
    panelIndex: number;
    tabIndex: number;
}
