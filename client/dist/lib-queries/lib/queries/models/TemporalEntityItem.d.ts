import { ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { BasicStatementItem } from './BasicStatementItem';
import { TemporalEntityRow } from './TemporalEntityRow';
export interface TemporalEntityItem extends BasicStatementItem {
    row: TemporalEntityRow;
    pkEntity: number;
    teEnProjRel: ProInfoProjRel;
}
