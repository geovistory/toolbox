import { ProDfhProfileProjRel } from '@kleiolab/lib-sdk-lb4';
import { ByPk } from '../../../public-api';

export interface ProDfhProfileProjRelSlice {
  by_fk_project__fk_profile?: ByPk<ProDfhProfileProjRel>;
  by_fk_project?: ByPk<ByPk<ProDfhProfileProjRel>>;
  by_fk_project__enabled?: ByPk<ByPk<ProDfhProfileProjRel>>;
}
