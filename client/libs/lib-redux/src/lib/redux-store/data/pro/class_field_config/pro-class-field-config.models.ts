import { ProClassFieldConfig } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../_lib/ByPk';


export interface ProClassFieldConfigSlice {
  by_pk_entity?: ByPk<ProClassFieldConfig>;
  by_fk_project__fk_class?: ByPk<ByPk<ProClassFieldConfig>>;
}

