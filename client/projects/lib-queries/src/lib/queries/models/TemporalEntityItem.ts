import { ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { BasicStatementItem } from './BasicStatementItem';
import { TemporalEntityRow } from './TemporalEntityRow';
export interface TemporalEntityItem extends BasicStatementItem {
    // fkClass: number; // fk_class of TemporalEntity
    row: TemporalEntityRow;
    pkEntity: number; // pk of TemporalEntity
    teEnProjRel: ProInfoProjRel;
}
