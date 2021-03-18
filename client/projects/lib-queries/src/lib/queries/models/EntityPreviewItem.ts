import { WarEntityPreview } from '@kleiolab/lib-sdk-lb4';
import { BasicStatementItem } from './BasicStatementItem';
export interface EntityPreviewItem extends BasicStatementItem {
    preview: WarEntityPreview;
    fkClass: number;
}
