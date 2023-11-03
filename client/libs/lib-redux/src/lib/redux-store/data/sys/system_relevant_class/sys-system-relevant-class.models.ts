import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '@kleiolab/lib-utils';

export interface SysRelevantClassSlice {
  by_pk_entity?: ByPk<SysSystemRelevantClass>;
  by_fk_class?: ByPk<ByPk<SysSystemRelevantClass>>;
  by_required_by_sources?: ByPk<ByPk<SysSystemRelevantClass>>;
  by_required?: ByPk<ByPk<SysSystemRelevantClass>>;
}
