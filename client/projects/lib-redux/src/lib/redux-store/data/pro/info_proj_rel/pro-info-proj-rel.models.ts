import { ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '@kleiolab/lib-utils';


export interface ProInfoProjRelSlice {
  by_fk_project__fk_entity?: ByPk<ProInfoProjRel>;
  loading?: boolean
}
