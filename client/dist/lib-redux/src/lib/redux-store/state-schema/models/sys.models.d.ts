import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb3';
import { SysConfigValue } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../root/models/model';
export interface SysRelevantClassSlice {
    by_pk_entity?: ByPk<SysSystemRelevantClass>;
    by_fk_class?: ByPk<ByPk<SysSystemRelevantClass>>;
    by_required_by_sources?: ByPk<ByPk<SysSystemRelevantClass>>;
    by_required?: ByPk<ByPk<SysSystemRelevantClass>>;
    loading?: boolean;
}
export interface SysConfigSlice {
    by_main?: ByPk<SysConfigValue>;
    loading?: boolean;
}
export interface Sys {
    system_relevant_class?: SysRelevantClassSlice;
    config?: SysConfigSlice;
    pkEntityModelMap: ByPk<{
        modelName: string;
    }>;
}
