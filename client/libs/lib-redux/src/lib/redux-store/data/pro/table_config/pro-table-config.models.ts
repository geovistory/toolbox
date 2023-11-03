import { ProTableConfig } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '@kleiolab/lib-utils';


export interface ProTableConfigSlice {
  by_pk_entity?: ByPk<ProTableConfig>;
  by_fk_digital?: ByPk<ByPk<ProTableConfig>>;
}
